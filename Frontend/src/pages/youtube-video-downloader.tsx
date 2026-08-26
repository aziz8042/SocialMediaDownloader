


// import { useState } from "react";
// import {
//   Box, Button, Container, Flex, Heading, Input, Text,
//   VStack, Wrap, WrapItem, IconButton, useColorModeValue, Stack
// } from "@chakra-ui/react";
// import { CloseIcon, DownloadIcon } from "@chakra-ui/icons";
// import Link from "next/link";
// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";
// import fs from "fs";
// import path from "path";
// import { startDownload } from "@/apis/startApi";
// import { downloadFile } from "@/apis/downlaodApi";
// import { updateFormatApi } from "@/apis/updateApi";
// import { API_BASE_URL } from "@/apis/api";
// import ThumbnailComponent from "@/components/ThumbnailComponent";
// import ProgressComponent from "@/components/ProgressComponent";
// import FooterComponent from "@/components/FooterComponent";

// import SeoContentLoader from "@/SeoMaster/SeoContentComponents/SeoContentLoader";
// import SeoFaqsLoader from "@/SeoMaster/SeoFaqs/SeoFaqsLoader";
// import HeadSEO from "@/components/headSeo";
// import HeaderComponent from "@/components/HeaderComponent";
// import { PulseLoader } from "react-spinners";

// interface SeoContent {
//   mainHeading: string;
//   introText: string;
//   featuresHeading: string;
//   featuresText: string;
//   featuresList: string[];
//   howToHeading: string;
//   howToText: string;
//   howToList: string[];
//   keywordsParagraphs: string[];
//   conclusionHeading: string;
//   conclusionText: string;
// }

// interface FaqItem {
//   question: string;
//   answer: string;
// }

// interface PageProps {
//   seoData: SeoContent;
//   faqs: FaqItem[];
//   headSeoData: any;
//   locale: string;
// }

// export interface DownloadResult {
//   url: string;
//   filename: string;
// }

// export default function AllVideoDownloader({ seoData, faqs, headSeoData, locale }: PageProps) {
//   const { t } = useTranslation("common");

//   const [url, setUrl] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [loadingFile, setLoadingFile] = useState(false);
//   const [taskId, setTaskId] = useState<string | null>(null);
//   const [videoData, setVideoData] = useState<any>(null);
//   const [format, setFormat] = useState<string>("");
//   const [showWarning, setShowWarning] = useState(true);

//   const [lastDownload, setLastDownload] = useState<{ url: string; filename: string } | null>(null);

//   const visiblePlatforms = t("YoutubeDownloader.ui.platformButtons", {
//     returnObjects: true,
//   }) as { name: string; path: string }[];

//    const youtubeOptions = [
//   { label: "1080p", value: "bestvideo[height<=1080]+bestaudio/best[height<=1080]" },
//   { label: "720p", value: "bestvideo[height<=720]+bestaudio/best[height<=720]" },
//   { label: "480p", value: "bestvideo[height<=480]+bestaudio/best[height<=480]" },
//   { label: "360p", value: "bestvideo[height<=360]+bestaudio/best[height<=360]" },
//   { label: "240p", value: "bestvideo[height<=240]+bestaudio/best[height<=240]" },
//   { label: "144p", value: "bestvideo[height<=144]+bestaudio/best[height<=144]" },
//   { label: t("thumbnail.quickFormats.mp3"), value: "mp3" },
// ];


  
//   const defaultOptions = [
//   { label: "1080p", value: "bestvideo+bestaudio/best" },
//   { label: "720p", value: "bestvideo[height<=720]+bestaudio/best[height<=720]/best" },
//   { label: "480p", value: "bestvideo[height<=480]+bestaudio/best[height<=480]/best" },
//   { label: "360p", value: "bestvideo[height<=360]+bestaudio/best[height<=360]/best" },
//   { label: "240p", value: "bestvideo[height<=240]+bestaudio/best[height<=240]/best" },
//   { label: "144p", value: "bestvideo[height<=144]+bestaudio/best[height<=144]/best" },
//   { label: t("thumbnail.quickFormats.mp3"), value: "mp3" },
// ];

//   const isYouTube =
//     url.toLowerCase().includes("youtube.com") || url.toLowerCase().includes("youtu.be");
//   const currentOptions = isYouTube ? youtubeOptions : defaultOptions;

//   // ── Start download process
//   const handleStartApi = async () => {
//     if (!url.trim()) return;
//     try {
//       setLoading(true);
//       const initialFormat = currentOptions[0].value;
//       setFormat(initialFormat);

//       const res = await startDownload(url, initialFormat);
//       setTaskId(res.task_id);
//       setVideoData(res);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ── Handle user selecting another format
//   const handleChangeQuality = async (selectedFormat: string): Promise<DownloadResult> => {
//     if (!taskId) throw new Error("No base task ID available");

//     setFormat(selectedFormat);
//     setShowModal(true);
//     setLoadingFile(true);

//     try {
//       const updateRes = await updateFormatApi(taskId, selectedFormat);
//       const newTaskId = updateRes.task_id || taskId;
//       setTaskId(newTaskId);
//       setVideoData((prev: any) => ({
//         ...prev,
//         format: selectedFormat,
//         task_id: newTaskId,
//       }));

//       let downloadUrl = "";
//       while (!downloadUrl) {
//         const result = await downloadFile(newTaskId);
//         if (result.status === "done" && result.url) {
//           downloadUrl = result.url;
//           break;
//         }
//         await new Promise((r) => setTimeout(r, 1000));
//       }

//       if (!/^https?:\/\//.test(downloadUrl)) {
//         downloadUrl = `${API_BASE_URL}/user_videos/${newTaskId}.${selectedFormat === "mp3" ? "mp3" : "mp4"}`;
//       }

//       const filename = downloadUrl.split("/").pop() || `file_${newTaskId}`;
     

//       setLastDownload({ url: downloadUrl, filename });
//       setLoadingFile(false);
//       return { url: downloadUrl, filename };
//     } catch (err) {
//       console.error("❌ Error in handleChangeQuality:", err);
//       setLoadingFile(false);
//       throw err;
//     }
//   };

//   return (
//     <>
//       <HeadSEO page="youtube-video-downloader" seoData={headSeoData} locale={locale} />
//       <HeaderComponent></HeaderComponent>
//       <Container maxW="6xl" py={6}>
//         <Stack spacing={15}>
//           <Box
//             rounded="xl"
//             shadow="md"
//             bg={useColorModeValue("white", "gray.800")}
//             p={6}
//             maxW={900}
//             mt={8}
//             mx="auto"
//           >
//             <VStack spacing={4} textAlign="center">
//               <Heading as="h1" size="lg">
//                 {t("YoutubeDownloader.ui.title")}
//               </Heading>
//               <Text maxW="680px" mx="auto">
//                 {t("YoutubeDownloader.ui.subtitle")}
//               </Text>
//             </VStack>

//             <Box mt={6} p={4} rounded="xl" bg="#444444" maxW="800px" mx="auto">
//               <Flex bg="white" align="center" p={2} rounded="md" gap={2} maxW="800px" mx="auto">
//                 <Input
//                   flex="1"
//                   placeholder={t("YoutubeDownloader.ui.inputPlaceholder") || ""}
//                   value={url}
//                   onChange={(e) => setUrl(e.target.value)}
//                   variant="unstyled"
//                   py={2}
//                 />
//                 {url && (
//                   <IconButton
//                     aria-label="Clear link"
//                     icon={<CloseIcon />}
//                     size="sm"
//                     color="green.500"
//                     variant="ghost"
//                     onClick={() => setUrl("")}
//                   />
//                 )}

//                 <Button
//                   bg="#01a65a"
//                   _hover={{ bg: "#019c55" }}
//                   onClick={handleStartApi}
//                   isDisabled={loading}
//                   flexShrink={0}
//                   leftIcon={<DownloadIcon />}
//                   color="white"
//                 >
//                   {loading ? (
//                     <>
//                       {t("YoutubeDownloader.ui.downloadBtn.loading")}
//                       <span style={{ marginLeft: "8px" }}>
//                         <PulseLoader color="#ffffff" margin={1} size={6} />
//                       </span>
//                     </>
//                   ) : (
//                     t("YoutubeDownloader.ui.downloadBtn.idle")
//                   )}
//                 </Button>
//               </Flex>

//               <Wrap mt={4} justify="center" spacing={2}>
//                 {visiblePlatforms.map((p) => (
//                   <WrapItem key={p.name}>
//                     <Button
//                       as={Link}
//                       href={p.path}
//                       variant="outline"
//                       size="sm"
//                       borderColor="white"
//                       color="white"
//                       _hover={{ transform: "scale(1.05)", bg: "whiteAlpha.200" }}
//                       _active={{ transform: "scale(0.98)" }}
//                     >
//                       {p.name} {t("YoutubeDownloader.ui.downloadBtn.idle")}
//                     </Button>
//                   </WrapItem>
//                 ))}
//               </Wrap>
//             </Box>

// {!loading && videoData && (
//               <ThumbnailComponent
//                 thumbnail={`${API_BASE_URL}${videoData.thumbnail}`}
//                 title={videoData.title}
//                 duration={videoData.duration}
//                 taskId={videoData.task_id}
//                 format={format}
//                 options={currentOptions}
//                 onFormatChange={handleChangeQuality}
//                 visible={!!videoData}
//               />
//             )}


//             {videoData && (
//               <ProgressComponent
//                 isOpen={showModal}
//                 loading={loadingFile}
//                 taskId={taskId}
//                 downloadUrl={lastDownload?.url || null}
//                 onClose={() => setShowModal(false)}
//               />
//             )}
//           </Box>
//         </Stack>
//       </Container>
//            {!loading && showWarning && (
//   <Box
//     bg="gray.30"
//     borderLeft="4px solid #ede9e9ff"
//     p={4}
//     rounded="md"
//     maxW="800px"
//     mx="auto"
   
//     position="relative"
//   >
//     <Text fontWeight="bold" color="black" mr={3}>
//       {t("LegalNotice.heading")}: {t("LegalNotice.text")}
//     </Text>
//     <IconButton
//       aria-label="Close warning"
//       icon={<CloseIcon />}
//       size="sm"
      
//       variant="solid"
//       bg="gray.50"       // light red background
//       color="black"      // icon color
//       _hover={{ bg: "red.300" }}
//       onClick={() => setShowWarning(false)}
//       position="absolute"
//       top={2}
//       right={2}
//       zIndex={1}
//     />
//   </Box>
// )}
//       <SeoContentLoader seoData={seoData} />
//       <SeoFaqsLoader faqs={faqs} />
//       <FooterComponent />
//     </>
//   );
// }

// // ── Static Props (SSG) with ISR
// export async function getStaticProps({ locale }: { locale: string }) {
//   const commonTranslations = await serverSideTranslations(locale, ["common"]);

//   const baseLocalePath = path.join(process.cwd(), "src", "locales", locale);

//   const loadJson = (fileName: string) => {
//     try {
//       const filePath = path.join(baseLocalePath, fileName);
//       const fileData = fs.readFileSync(filePath, "utf-8");
//       return JSON.parse(fileData);
//     } catch (e) {
//       console.error(`❌ Failed to load ${fileName} for ${locale}:`, e);
//       return {};
//     }
//   };

//   const seoJson = loadJson("seo.json");
//   const faqsJson = loadJson("faqs.json");
//   const headSeoJson = loadJson("headseo.json");

//   const routeKey = "YoutubeDownloader";
//   const headSeoData = headSeoJson["YoutubeDownloader"] || {};

//   return {
//     props: {
//       ...commonTranslations,
//       locale,
//       seoData: seoJson[routeKey]?.seoContent ?? null,
//       faqs: faqsJson[routeKey]?.faqs ?? [],
//       headSeoData,
//     },
//     revalidate: 9999999, // <-- ISR: regenerate page every 60 seconds
//   };
// }

















import { useState } from "react";
import {
  Box, Button, Container, Flex, Heading, Input, Text,
  VStack, Wrap, WrapItem, IconButton, useColorModeValue, Stack
} from "@chakra-ui/react";
import { CloseIcon, DownloadIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import fs from "fs";
import path from "path";
import { startDownload } from "@/apis/startApi";
import { downloadFile } from "@/apis/downlaodApi";
import { updateFormatApi } from "@/apis/updateApi";
import { API_BASE_URL } from "@/apis/api";
import ThumbnailComponent from "@/components/ThumbnailComponent";
import ProgressComponent from "@/components/ProgressComponent";
import FooterComponent from "@/components/FooterComponent";

import SeoContentLoader from "@/SeoMaster/SeoContentComponents/SeoContentLoader";
import SeoFaqsLoader from "@/SeoMaster/SeoFaqs/SeoFaqsLoader";
import HeadSEO from "@/components/headSeo";
import HeaderComponent from "@/components/HeaderComponent";
import { PulseLoader } from "react-spinners";
import { platformNames } from "@/components/platforms";
interface SeoContent {
  seconadykeywordheading: string;
  fourhundredwordparagraph: string;
  featuresHeading: string;
  featuresList: string[];
  image1?: string;
  image2?: string;
  howtodownloadheadingwithsecondarykeyword: string;
  howtodownloadlist: string[];
  whyuseourdownloaderheading: string;
  unorderlist: string[];
  keyworddownloaderaimheading: string;
  paragraph: string[];
  whatisheadingkeyword: string;
  paragraph2: string;
}

interface PlatformLink {
  name: string;
  href: string;
  icon: string;
}

interface Props {
  seoData: SeoContent;
  platformLinks?: PlatformLink[]; // Optional platform links array
}

interface FaqItem {
  question: string;
  answer: string;
}

interface PageProps {
  seoData: SeoContent;
  faqs: FaqItem[];
  headSeoData: any;
  locale: string;
  navLinks: { label: string; href: string }[]; // add this
  languages: { label: string; value: string }[]; // add this
  currentLocale: string; // add this
}


export interface DownloadResult {
  url: string;
  filename: string;
}

export default function AllVideoDownloader({
  seoData,
  faqs,
  headSeoData,
  locale,
  navLinks,
  languages,
  currentLocale,
}: PageProps) {
  const { t } = useTranslation("common");

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loadingFile, setLoadingFile] = useState(false);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<any>(null);
  const [format, setFormat] = useState<string>("");
  // const [showWarning, setShowWarning] = useState(true);

  const [lastDownload, setLastDownload] = useState<{ url: string; filename: string } | null>(null);

  const visiblePlatforms = t("YoutubeDownloader.ui.platformButtons", {
    returnObjects: true,
  }) as { name: string; path: string }[];

  
   const youtubeOptions = [
  { label: "1080p", value: "bestvideo[height<=1080]+bestaudio/best[height<=1080]" },
  { label: "720p", value: "bestvideo[height<=720]+bestaudio/best[height<=720]" },
  { label: "480p", value: "bestvideo[height<=480]+bestaudio/best[height<=480]" },
  { label: "360p", value: "bestvideo[height<=360]+bestaudio/best[height<=360]" },
  { label: "240p", value: "bestvideo[height<=240]+bestaudio/best[height<=240]" },
  { label: "144p", value: "bestvideo[height<=144]+bestaudio/best[height<=144]" },
  { label: "mp3", value: "mp3" },
];
 
type PlatformKey = "tiktok" | "instagram" | "youtube" | "facebook" | "twitter";
// --- Platform Buttons Removal Logic (SSG Only) --- ///
const platformButtonsRaw = [
  { name: "youtube downloader", path: "/youtube-video-downloader" },
  { name: "tiktok downloader", path: "/tiktok-video-downloader" },
  { name: "instagram downloader", path: "/instagram-video-downloader" },
  { name: "facebook downloader", path: "/facebook-video-downloader" },
  { name: "twitter downloader", path: "/twitter-video-downloader" },
];

// determine which button to remove for this page (SSG-safe)
let removeIndex: number | null = null;

// current page is ALWAYS all-video-downloader → remove Twitter
removeIndex = 4;

// (if later you reuse this logic for tool pages, add slug-based checks here)

const filteredPlatformButtons =
  removeIndex !== null
    ? platformButtonsRaw.filter((_, i) => i !== removeIndex)
    : platformButtonsRaw;


const platformLinks: { name: string; href: string; icon: string }[] = [
  { key: "tiktok", href: `/${locale}/tiktok-video-downloader`, icon: "/tiktokicon.svg" },
  { key: "instagram", href: `/${locale}/instagram-video-downloader`, icon: "/instagramicon.svg" },
  { key: "youtube", href: `/${locale}/youtube-video-downloader`, icon: "/youtubeicon.svg" },
  { key: "facebook", href: `/${locale}/facebook-video-downloader`, icon: "/facebookicon.svg" },
  { key: "twitter", href: `/${locale}/twitter-video-downloader`, icon: "/twittericon.svg" },
  { key: "youtubeMp3", href: `/${locale}/youtube-to-mp3-converter`, icon: "/youtubemp3icon.svg" }
].map((p) => ({
  name: platformNames[locale as keyof typeof platformNames]?.[p.key as PlatformKey] 
        || platformNames["en"][p.key as PlatformKey],
  href: p.href,
  icon: p.icon,
}));






  
  const defaultOptions = [
  { label: "1080p", value: "bestvideo+bestaudio/best" },
  { label: "720p", value: "bestvideo[height<=720]+bestaudio/best[height<=720]/best" },
  { label: "480p", value: "bestvideo[height<=480]+bestaudio/best[height<=480]/best" },
  { label: "360p", value: "bestvideo[height<=360]+bestaudio/best[height<=360]/best" },
  { label: "240p", value: "bestvideo[height<=240]+bestaudio/best[height<=240]/best" },
  { label: "144p", value: "bestvideo[height<=144]+bestaudio/best[height<=144]/best" },
  { label: "mp3", value: "mp3" },
];


  const isYouTube =
    url.toLowerCase().includes("youtube.com") || url.toLowerCase().includes("youtu.be");
  const currentOptions = isYouTube ? youtubeOptions : defaultOptions;

  // ── Start download process
  const handleStartApi = async () => {
    if (!url.trim()) return;
    try {
      setLoading(true);
      const initialFormat = currentOptions[0].value;
      setFormat(initialFormat);

      const res = await startDownload(url, initialFormat);
      setTaskId(res.task_id);
      setVideoData(res);
    } finally {
      setLoading(false);
    }
  };



  
  // ── Handle user selecting another format
  const handleChangeQuality = async (selectedFormat: string): Promise<DownloadResult> => {
    if (!taskId) throw new Error("No base task ID available");

    setFormat(selectedFormat);
    setShowModal(true);
    setLoadingFile(true);

    try {
      const updateRes = await updateFormatApi(taskId, selectedFormat);
      const newTaskId = updateRes.task_id || taskId;
      setTaskId(newTaskId);
      setVideoData((prev: any) => ({
        ...prev,
        format: selectedFormat,
        task_id: newTaskId,
      }));

      let downloadUrl = "";
      while (!downloadUrl) {
        const result = await downloadFile(newTaskId);
        if (result.status === "done" && result.url) {
          downloadUrl = result.url;
          break;
        }
        await new Promise((r) => setTimeout(r, 1000));
      }

      if (!/^https?:\/\//.test(downloadUrl)) {
        downloadUrl = `${API_BASE_URL}/user_videos/${newTaskId}.${selectedFormat === "mp3" ? "mp3" : "mp4"}`;
      }

      const filename = downloadUrl.split("/").pop() || `file_${newTaskId}`;
    

      setLastDownload({ url: downloadUrl, filename });
      setLoadingFile(false);
      return { url: downloadUrl, filename };
    } catch (err) {
      console.error("❌ Error in handleChangeQuality:", err);
      setLoadingFile(false);
      throw err;
    }
  };

  return (
    <>
      {/* ✅ Localized HeadSEO */}
      <HeadSEO page="youtube-video-downloader" seoData={headSeoData} locale={locale} />
       <HeaderComponent
        navLinks={navLinks}
        languages={languages}
        currentLocale={currentLocale}
      />
      <Container maxW="6xl" py={6}>
        <Stack spacing={15}>
          <Box
            rounded="xl"
            shadow="md"
            bg={useColorModeValue("white", "gray.800")}
            p={{ base: 0, sm: 2, md: 6 }}
            maxW={900}
            mt={8}
            mx="auto"
          >
            <VStack spacing={4} textAlign="center">
              <Heading as="h1" size="lg">
                {t("YoutubeDownloader.ui.title")}
              </Heading>
              <Text maxW="680px" mx="auto">
                {t("YoutubeDownloader.ui.subtitle")}
              </Text>
            </VStack>

            <Box mt={6} p={4} rounded="xl" bg="#444444" maxW="800px" mx="auto">
              <Flex bg="white" align="center" p={2} rounded="md" gap={2} maxW="800px" mx="auto">
                <Input
                  flex="1"
                  placeholder={t("YoutubeDownloader.ui.inputPlaceholder") || ""}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  variant="unstyled"
                  py={2}
                />
                {url && (
                  <IconButton
                    aria-label="Clear link"
                    icon={<CloseIcon />}
                    size="sm"
                    color="green.500"
                    variant="ghost"
                    onClick={() => setUrl("")}
                  />
                )}

              <Button
  bg="#01a65a"
  _hover={{ bg: "#019c55" }}
  onClick={handleStartApi}
  isDisabled={loading}
  flexShrink={0}
  leftIcon={<DownloadIcon />}
  color="white"
  size={{ base: "sm", md: "md" }} // <-- small on mobile, medium on desktop
  px={{ base: 3, md: 6 }}         // <-- padding adjusts responsively
  py={{ base: 1.5, md: 3 }}
>
  {loading ? (
    <>
      {t("YoutubeDownloader.ui.downloadBtn.loading")}
      <span style={{ marginLeft: "8px" }}>
        <PulseLoader color="#ffffff" margin={1} size={6} />
      </span>
    </>
  ) : (
    t("YoutubeDownloader.ui.downloadBtn.idle")
  )}
</Button>

              </Flex>

              <Wrap mt={4} justify="center" spacing={2}>
                {visiblePlatforms.map((p) => (
                  <WrapItem key={p.name}>
                    <Button
                      as={Link}
                      href={p.path}
                      variant="outline"
                      size="sm"
                      borderColor="white"
                      color="white"
                      _hover={{ transform: "scale(1.05)", bg: "whiteAlpha.200" }}
                      _active={{ transform: "scale(0.98)" }}
                    >
                      {p.name} 
                    </Button>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>


            {!loading && videoData && (
              <ThumbnailComponent
                thumbnail={`${API_BASE_URL}${videoData.thumbnail}`}
                title={videoData.title}
                duration={videoData.duration}
                taskId={videoData.task_id}
                format={format}
                options={currentOptions}
                onFormatChange={handleChangeQuality}
                visible={!!videoData}
              />
            )}

            {videoData && (
              <ProgressComponent
                isOpen={showModal}
                loading={loadingFile}
                taskId={taskId}
                downloadUrl={lastDownload?.url || null}
                onClose={() => setShowModal(false)}
              />
            )}
          </Box>
        </Stack>
      </Container>


      {/* <SeoContentLoader seoData={seoData} /> */}
    

   <SeoContentLoader
  seoData={seoData}
  platformLinks={platformLinks} // ✅ localized names now
/>


      <SeoFaqsLoader faqs={faqs} />
      <FooterComponent />
    </>
  );
}

// ✅ Static Props (SSG)

export async function getStaticProps({ locale }: { locale: string }) {
  const commonTranslations = await serverSideTranslations(locale, ["common"]);

  const baseLocalePath = path.join(process.cwd(), "src", "locales", locale);

  const loadJson = (fileName: string) => {
    try {
      const filePath = path.join(baseLocalePath, fileName);
      const fileData = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileData);
    } catch (e) {
      console.error(`❌ Failed to load ${fileName} for ${locale}:`, e);
      return {};
    }
  };
const navLinks = [
    { label: "TikTok", href: "/tiktok-video-downloader" },
    { label: "YouTube ", href: "/youtube-video-downloader" },
    { label: "Facebook ", href: "/facebook-video-downloader" },
    { label: "Instagram ", href: "/instagram-video-downloader" },
    { label: "Twitter ", href: "/twitter-video-downloader" },
    { label: "youtube to mp3 ", href: "/youtube-to-mp3-converter" }
  ];
const languages = [
  { label: "English", value: "en" },
  { label: "Deutsch", value: "de" },
  { label: "Español", value: "es" },
  { label: "Français", value: "fr" },
  { label: "हिन्दी", value: "hi" },
  { label: "Indonesia", value: "id" },
  { label: "Italiano", value: "it" },
  { label: "日本語", value: "ja" },
  { label: "한국어", value: "ko" },
  { label: "Melayu", value: "ms" },
  { label: "မြန်မာ", value: "my" },
  { label: "Filipino", value: "fil" },
  { label: "Português", value: "pt" },
  { label: "Русский", value: "ru" },
  { label: "ไทย", value: "th" },
  { label: "Türkçe", value: "tr" },
  { label: "简体中文", value: "zh" },
  { label: "繁體中文", value: "zh-TW" },
  { label: "বাংলা", value: "bn" },
  { label: "العربية", value: "ar" },
];

  const seoJson = loadJson("seo.json");
  const faqsJson = loadJson("faqs.json");
  const headSeoJson = loadJson("headseo.json");

  const routeKey = "YoutubeDownloader";
  const headSeoData = headSeoJson["YoutubeDownloader"] || {};

  return {
    props: {
      ...commonTranslations,
      locale,
      seoData: seoJson[routeKey]?.seoContent ?? null,
      faqs: faqsJson[routeKey]?.faqs ?? [],
      headSeoData,
       navLinks,
      languages,
      currentLocale: locale,
      
    },
    revalidate: 9999999, // <-- ISR: regenerate page every 60 seconds
  };
}
