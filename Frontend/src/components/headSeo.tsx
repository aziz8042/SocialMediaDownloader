

import Head from "next/head";

type HeadSEOProps = {
  seoData: {
    title?: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
  };
  page: string;
  locale: string;
};

const SITE_URL = "https://url2video.online";
const SUPPORTED_LOCALES = [
       "en","es","hi","ar","fr","de","ru","pt","ja","ko","tr","it",
       "id","ms","bn","th","fil","zh","zh-TW","my"
     ];
const GA_ID = "G-ETT84CXRNY"; // Google Analytics ID

export default function HeadSEO({ seoData, page, locale }: HeadSEOProps) {
  const canonicalUrl =
    page === "/" || !page
      ? `${SITE_URL}/${locale}`
      : `${SITE_URL}/${locale}/${page}`;
  const ogImage = seoData.ogImage || "/default-og.png";

  return (
    <Head>
      {/* ✅ Primary SEO */}
      <title>{seoData.title || "URL2Video - All Video Downloader"}</title>
      <meta
        name="description"
        content={
          seoData.description ||
          "Download videos from YouTube, TikTok, Instagram, Facebook, and X. Free, fast, and no ads."
        }
      />
      <meta
        name="keywords"
        content={
          seoData.keywords ||
          "video downloader, youtube downloader, tiktok downloader, instagram downloader, facebook downloader, X downloader, mp4, mp3"
        }
      />
      <meta name="robots" content="index, follow" />
      <meta name="content-language" content={locale} />

      {/* ✅ Open Graph */}
      <meta property="og:title" content={seoData.ogTitle || seoData.title} />
      <meta
        property="og:description"
        content={seoData.ogDescription || seoData.description}
      />
      <meta property="og:image" content={ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content={locale} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="URL2Video" />

      {/* ✅ Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* ✅ Hreflang for International SEO */}
      {/* {SUPPORTED_LOCALES.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          hrefLang={lang}
          href={`${SITE_URL}/${lang}/${page}`}
        />
      ))}
      <link
        rel="alternate"
        hrefLang="x-default"
        href={`${SITE_URL}/en/${page}`}
      /> */}
      {/* ✅ Hreflang for International SEO */}
{SUPPORTED_LOCALES.map((lang) => {
  const cleanPage = page ? page.replace(/^\/+/, "") : "";
  const baseUrl = SITE_URL.replace(/\/+$/, "");
  const href = cleanPage
    ? `${baseUrl}/${lang}/${cleanPage}`
    : `${baseUrl}/${lang}`;
  return (
    <link
      key={lang}
      rel="alternate"
      hrefLang={lang}
      href={href}
    />
  );
})}

{/* ✅ x-default should always point to the English homepage or page */}
<link
  rel="alternate"
  hrefLang="x-default"
  href={
    page
      ? `${SITE_URL.replace(/\/+$/, "")}/en/${page.replace(/^\/+/, "")}`
      : `${SITE_URL.replace(/\/+$/, "")}/en`
  }
/>


      {/* ✅ Google Analytics (gtag.js) */}
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      ></script>
      <script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* ✅ Essential Meta */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="UTF-8" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}
