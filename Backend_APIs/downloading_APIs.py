import os
import uuid
import time
import json
import subprocess
import asyncio
import re

import aiohttp
import yt_dlp

# async redis for endpoints
import redis.asyncio as redis_async
# sync redis for worker
import redis as redis_sync

from urllib.parse import urlparse
from fastapi import FastAPI, Query, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, StreamingResponse, JSONResponse

# ─── FastAPI Setup ─────────────────────────────────────────────
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Centralized exception handling ───────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    detail = str(exc) or "Internal server error"
    
    return JSONResponse(
        status_code=500,
        content={"status": "error", "detail": detail},
    )

# ─── Redis clients ─────────────────────────────────────────
redis_client = redis_async.Redis(host="localhost", port=6379, decode_responses=True)
redis_sync_client = redis_sync.Redis(host="localhost", port=6379, decode_responses=True)

# ─── Config ───────────────────────────────────────────────────
MAX_TASK_AGE = 20 * 60 
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

THUMBNAIL_DIR = os.path.join(BASE_DIR, "user_thumbnails")
VIDEO_DIR = os.path.join(BASE_DIR, "user_videos")
os.makedirs(THUMBNAIL_DIR, exist_ok=True)
os.makedirs(VIDEO_DIR, exist_ok=True)

app.mount("/user_thumbnails", StaticFiles(directory=THUMBNAIL_DIR), name="thumbnails")

ALLOWED_DOMAINS = [
    "youtube.com", "youtu.be",
    "tiktok.com",
    "instagram.com",
    "twitter.com", "x.com",
    "facebook.com",
    "dailymotion.com",
    "vimeo.com",
    "reddit.com",
    "pexels.com"
]

# ─── Helpers ──────────────────────────────────────────────────
def is_valid_url(url: str) -> bool:
    try:
        parsed = urlparse(url if url.startswith("http") else "http://" + url)
        domain = parsed.netloc.lower()
        if domain.startswith("www."):
            domain = domain[4:]
        valid = any(domain == d or domain.endswith("." + d) for d in ALLOWED_DOMAINS)
       
        return valid
    except Exception as e:
        print(f"[URL CHECK ERROR] {url} -> {e}")
        return False

import asyncio

async def cleanup_task(task_id: str):
    """
    Deletes the video and thumbnail for a task, and removes its Redis entry after MAX_TASK_AGE.
    """
    await asyncio.sleep(MAX_TASK_AGE)

    try:
        # Delete video(s)
        for f in os.listdir(VIDEO_DIR):
            if f.startswith(task_id):
                video_path = os.path.join(VIDEO_DIR, f)
                try:
                    os.remove(video_path)
                    
                except Exception as e:
                    print(f"[CLEANUP ERROR] Failed to delete video {video_path}: {e}")

        # Delete thumbnail(s)
        for f in os.listdir(THUMBNAIL_DIR):
            if f.startswith(task_id):
                thumb_path = os.path.join(THUMBNAIL_DIR, f)
                try:
                    os.remove(thumb_path)
                    
                except Exception as e:
                    print(f"[CLEANUP ERROR] Failed to delete thumbnail {thumb_path}: {e}")

        # Remove Redis entry
        try:
            await redis_client.delete(f"task:{task_id}")
            print(f"[CLEANUP] Deleted Redis key for task: {task_id}")
        except Exception as e:
            print(f"[CLEANUP ERROR] Failed to delete Redis key for task {task_id}: {e}")

    except Exception as e:
        print(f"[CLEANUP ERROR] Unexpected error for task {task_id}: {e}")



async def download_thumbnail(url: str, save_path: str):
    try:
        headers = {
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/120.0.0.0 Safari/537.36"
            ),
            "Accept": "image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
            "Referer": url,
        }
        async with aiohttp.ClientSession(headers=headers) as session:
            async with session.get(url, timeout=15) as resp:
                
                if resp.status == 200:
                    data = await resp.read()
                    if data and len(data) > 1000:
                        with open(save_path, "wb") as f:
                            f.write(data)
                        
                        return True
    except Exception as e:
        print(f"[THUMBNAIL ERROR] {url} -> {e}")
    return False
from urllib.parse import urlparse, parse_qs, urlencode, urlunparse

def sanitize_youtube_url(url: str) -> str:
    """
    Remove playlist or radio parameters from YouTube URLs
    """
    parsed = urlparse(url)
    if "youtube.com" in parsed.netloc or "youtu.be" in parsed.netloc:
        qs = parse_qs(parsed.query)
        # Keep only 'v' parameter for the main video
        new_qs = {}
        if 'v' in qs:
            new_qs['v'] = qs['v']
        new_query = urlencode(new_qs, doseq=True)
        sanitized = urlunparse((parsed.scheme, parsed.netloc, parsed.path, parsed.params, new_query, parsed.fragment))
        return sanitized
    return url

# ─── Start Endpoint ───────────────────────────────────────────
@app.get("/start")
async def start_download(url: str = Query(...), format: str = Query(...)):
   
    if not is_valid_url(url):
        raise HTTPException(status_code=400, detail="Invalid or disallowed URL")
    url=sanitize_youtube_url(url)
    task_id = f"{uuid.uuid4().hex}_{int(time.time()*1000)}"
    task_key = f"task:{task_id}"
    default_thumb_path = os.path.join(THUMBNAIL_DIR, f"{task_id}.jpg")

    task_data = {
        "progress": "0",
        "status": "pending",
        "file": "",
        "thumbnail": "",
        "url": url,
        "format": format,
        "title": "",
        "duration": "0",
        "created_at": str(time.time())
    }
    await redis_client.hset(task_key, mapping=task_data)
    asyncio.create_task(cleanup_task(task_id))
    try:
       
        if "youtube.com" in url or "youtu.be" in url:
            platform, cookie_arg, referer = "youtube", \
                "chrome:/var/www/url2vedio/social-media-video-downloader/user_data_headless/Default", \
                "https://www.youtube.com/"
        elif "instagram.com" in url:
            platform, cookie_arg, referer = "instagram", \
                "chrome:/var/www/url2vedio/social-media-video-downloader/user_data_headless/Default", \
                "https://www.instagram.com/"
        else:
            platform, cookie_arg, referer = "other", None, None

        if platform in ["youtube", "instagram"]:
            cmd = [
                "yt-dlp", "--cookies-from-browser", cookie_arg,
                "--rm-cache-dir", "--no-check-certificate",
                "--skip-download", "--print-json", "--no-playlist",
                "--add-header", "User-Agent: Mozilla/5.0",
                "--add-header", f"Referer: {referer}",
                url
            ]
          
            result = subprocess.run(cmd, capture_output=True, text=True)
            if result.returncode != 0:
                raise Exception(result.stderr or "yt-dlp metadata fetch failed")
            info = json.loads(result.stdout)
        else:
            with yt_dlp.YoutubeDL({"quiet": True, "skip_download": True}) as ydl:
                info = ydl.extract_info(url, download=False)

        title = info.get("title") or "Unknown Title"
        duration = str(info.get("duration") or 0)
       
        await redis_client.hset(task_key, mapping={"title": title, "duration": duration})

        thumbnail_url = info.get("thumbnail")
        if thumbnail_url:
            ext = thumbnail_url.split("?")[0].split(".")[-1] or "jpg"
            thumb_path = os.path.join(THUMBNAIL_DIR, f"{task_id}.{ext}")
            if await download_thumbnail(thumbnail_url, thumb_path):
                await redis_client.hset(task_key, mapping={"thumbnail": f"/user_thumbnails/{task_id}.{ext}"})
            else:
                open(default_thumb_path, "wb").close()
                await redis_client.hset(task_key, mapping={"thumbnail": f"/user_thumbnails/{task_id}.jpg"})
        else:
            open(default_thumb_path, "wb").close()
            await redis_client.hset(task_key, mapping={"thumbnail": f"/user_thumbnails/{task_id}.jpg"})

    except Exception as e:
       
        open(default_thumb_path, "wb").close()
        await redis_client.hset(task_key, mapping={"status": f"error: {str(e)}"})

    task = await redis_client.hgetall(task_key)
    return {"task_id": task_id, "thumbnail": task.get("thumbnail", ""), "title": task.get("title", ""), "duration": task.get("duration", "0")}

# ─── Worker ───────────────────────────────────────────────────

# ─── Config ───────────────────────────────────────────────────
VIDEO_DIR = "/var/www/url2vedio/social-media-video-downloader/user_videos"
os.makedirs(VIDEO_DIR, exist_ok=True)

# ✅ Serve user_videos directly
app.mount("/user_videos", StaticFiles(directory=VIDEO_DIR), name="user_videos")



import os
import subprocess
import yt_dlp

import os
import subprocess
import asyncio

import yt_dlp

# ─── Configuration ─────────────────────────────────────────────
VIDEO_DIR = "/var/www/url2vedio/social-media-video-downloader/user_videos"
PUBLIC_URL_PREFIX = "/user_videos"  # Make sure your webserver serves VIDEO_DIR here

# Ensure directory exists
os.makedirs(VIDEO_DIR, exist_ok=True)




redis_client = redis_async.Redis(host="localhost", port=6379, decode_responses=True)
sync_redis = redis_sync.Redis(host="localhost", port=6379, decode_responses=True)


# ─── Download Worker ──────────────────────────────────────────
def download_worker(url: str, format: str, task_id: str) -> str:
    """
    Downloads video/audio and updates Redis with status and file path.
    Returns the absolute file path.
    """
    try:
        filepath_template = os.path.join(VIDEO_DIR, f"{task_id}.%(ext)s")
        fmt_l = (format or "").lower()

        # Detect audio requests
        is_audio_request = fmt_l == "mp3" or ("bestaudio" in fmt_l and "video" not in fmt_l)
        audio_target = "mp3" if "mp3" in fmt_l else "m4a"

        # ── YouTube / Instagram → subprocess with cookies + aria2c for fast downloads
        if "youtube.com" in url or "youtu.be" in url or "instagram.com" in url:
            cookie_arg = "chrome:/var/www/url2vedio/social-media-video-downloader/user_data_headless/Default"
            referer = "https://www.youtube.com/" if "youtube" in url else "https://www.instagram.com/"

            if is_audio_request:
                cmd = [
                    "yt-dlp", "--newline",
                    "--cookies-from-browser", cookie_arg,
                    "--rm-cache-dir", "--no-check-certificate",
                    "-f", "bestaudio/best",
                    "--extract-audio", "--audio-quality", "0",
                    "--audio-format", audio_target,
                    "--add-header", f"Referer: {referer}",
                    "-o", filepath_template, url
                ]
            else:
                cmd = [
                    "yt-dlp", "--newline",
                    "--cookies-from-browser", cookie_arg,
                    "--rm-cache-dir", "--no-check-certificate",
                    "-f", format,
                    "--concurrent-fragments", "16",
                    "--external-downloader", "aria2c",
                    "--external-downloader-args",
                    "-x 16 -s 16 -k 4M --max-connection-per-server=16 --split=16 --min-split-size=4M",
                    "--no-keep-fragments", "--no-part",
                    "--merge-output-format", "mp4",
                    "--add-header", f"Referer: {referer}",
                    "-o", filepath_template, url
                ]

            subprocess.run(cmd, check=True)

        # ── Other sites → yt-dlp Python API
        else:
            ytdlp_format = "bestaudio/best" if is_audio_request else format

            opts = {
                "format": ytdlp_format,
                "outtmpl": filepath_template,
                "noplaylist": True,
                "nopart": True,
                "keep_fragments": False,
                "quiet": False,
            }

            if is_audio_request:
                opts["postprocessors"] = [{
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }]
                filepath_template = os.path.join(VIDEO_DIR, f"{task_id}.mp3")
                opts["outtmpl"] = filepath_template
            else:
                opts["postprocessors"] = [{
                    "key": "FFmpegVideoConvertor",
                    "preferedformat": "mp4",
                }]

            with yt_dlp.YoutubeDL(opts) as ydl:
                info = ydl.extract_info(url, download=True)
                raw_file = ydl.prepare_filename(info)

        # ── Locate final file
        final_file = None
        for f in os.listdir(VIDEO_DIR):
            if f.startswith(task_id) and not f.endswith((".part", ".ytdl")) and "Frag" not in f:
                final_file = os.path.join(VIDEO_DIR, f)
                break

        if not final_file:
            raise Exception("Downloaded file not found")

        # Update Redis with status and file
        sync_redis.hset(f"task:{task_id}", mapping={"status": "done", "file": final_file})

        return f"{PUBLIC_URL_PREFIX}/{os.path.basename(final_file)}"

    except Exception as e:
        sync_redis.hset(f"task:{task_id}", mapping={"status": f"error: {e}"})
        raise Exception(f"Download failed: {e}")

# ─── FastAPI Endpoint ─────────────────────────────────────────
@app.get("/download")
async def download_file(task_id: str):
    """
    Returns public URL of downloaded file once ready.
    """
    key = f"task:{task_id}"
    task = await redis_client.hgetall(key)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")

    if task.get("status") == "pending":
        await redis_client.hset(key, mapping={"status": "downloading"})
        try:
            # Run download_worker in background and wait for completion
            file_url = await asyncio.get_running_loop().run_in_executor(
                None, download_worker, task["url"], task["format"], task_id
            )
            return {"status": "done", "url": file_url}
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

    elif task.get("status") == "done" and task.get("file"):
        return {"status": "done", "url": task["file"]}

    elif task.get("status", "").startswith("error"):
        raise HTTPException(status_code=500, detail=task["status"])

    else:
        raise HTTPException(status_code=202, detail="File is still downloading, try again shortly")
from fastapi.responses import StreamingResponse

VIDEO_DIR = "/var/www/url2vedio/social-media-video-downloader/user_videos"



@app.get("/fetch_blob")
async def fetch_blob(task_id: str = Query(...)):
    """
    Stream an already-downloaded file as an attachment.
    This version streams in 1MB chunks for fast startup and low memory use.
    """
    try:
        for filename in os.listdir(VIDEO_DIR):
            if filename.startswith(task_id):
                file_path = os.path.join(VIDEO_DIR, filename)
                if os.path.isfile(file_path):
                    print(f"✅ [FOUND] {file_path}")

                    def iterfile():
                        with open(file_path, "rb") as f:
                            while chunk := f.read(1024 * 1024):  # 1 MB chunks
                                yield chunk

                    print("🟢 [SENDING] Streaming started...")
                    return StreamingResponse(
                        iterfile(),
                        media_type="application/octet-stream",
                        headers={
                            "Content-Disposition": f'attachment; filename="{filename}"'
                        },
                    )

        raise HTTPException(status_code=404, detail="File not found")

    except Exception as e:
        print(f"❌ [ERROR] {e}")
        raise HTTPException(status_code=500, detail=str(e))
    
@app.post("/update_format/{task_id}")
async def update_format(
    task_id: str,
    format: str = Query(..., description="yt-dlp format string")
):
    key = f"task:{task_id}"
    old_task = await redis_client.hgetall(key)
    if not old_task:
        raise HTTPException(status_code=404, detail="Task not found")

    await redis_client.delete(key)
    new_task_id = f"{uuid.uuid4().hex}_{int(time.time()*1000)}"
    new_key = f"task:{new_task_id}"

    new_task = {
        "progress": "0",
        "status": "pending",
        "file": "",
        "thumbnail": old_task.get("thumbnail", ""),
        "url": old_task.get("url", ""),
        "format": format,
        "title": old_task.get("title", "Unknown Title"),
        "duration": old_task.get("duration", "0"),
        "created_at": str(time.time())
    }
    await redis_client.hset(new_key, mapping=new_task)

    return {
        "task_id": new_task_id,
        "format": format,
        "thumbnail": new_task["thumbnail"],
        "title": new_task["title"],
        "duration": new_task["duration"],
        "message": "✅ New task created with updated format"
    }

