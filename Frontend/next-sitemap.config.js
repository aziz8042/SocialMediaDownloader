// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'https://url2video.online', // your live domain
//   generateRobotsTxt: true,             // also creates robots.txt
//   generateIndexSitemap: false,         // single sitemap file (good for under ~5k URLs)
//   changefreq: 'weekly',
//   priority: 0.8,
//   sitemapSize: 7000,
//   autoLastmod: true,

//   // 👇 Important for multilingual setup
//  alternateRefs: [
//   { href: 'https://url2video.online/', hreflang: 'x-default' },
//   { href: 'https://url2video.online/en', hreflang: 'en' },
//   { href: 'https://url2video.online/es', hreflang: 'es' },
//   { href: 'https://url2video.online/hi', hreflang: 'hi' },
//   { href: 'https://url2video.online/ar', hreflang: 'ar' },
//   { href: 'https://url2video.online/fr', hreflang: 'fr' },
//   { href: 'https://url2video.online/de', hreflang: 'de' },
//   { href: 'https://url2video.online/ru', hreflang: 'ru' },
//   { href: 'https://url2video.online/pt', hreflang: 'pt' },
//   { href: 'https://url2video.online/ja', hreflang: 'ja' },
//   { href: 'https://url2video.online/ko', hreflang: 'ko' },
//   { href: 'https://url2video.online/tr', hreflang: 'tr' },
//   { href: 'https://url2video.online/it', hreflang: 'it' },
//   { href: 'https://url2video.online/id', hreflang: 'id' },
//   { href: 'https://url2video.online/ms', hreflang: 'ms' },
//   { href: 'https://url2video.online/bn', hreflang: 'bn' },
//   { href: 'https://url2video.online/th', hreflang: 'th' },
//   { href: 'https://url2video.online/fil', hreflang: 'fil' },
//   { href: 'https://url2video.online/zh', hreflang: 'zh' },
//   { href: 'https://url2video.online/zh-TW', hreflang: 'zh-TW' },
//   { href: 'https://url2video.online/my', hreflang: 'my' },
// ],

// };





// /** @type {import('next-sitemap').IConfig} */
// module.exports = {
//   siteUrl: 'https://url2video.online',
//   generateRobotsTxt: true,
//   generateIndexSitemap: false,
//   changefreq: 'weekly',
//   priority: 0.8,
//   sitemapSize: 7000,
//   autoLastmod: true,

//   // 👇 Exclude ONLY localized duplicates of these 3 pages
//   exclude: [
//     '/ar/about-us',
//     '/es/about-us',
//     '/hi/about-us',
//     '/fr/about-us',
//     '/de/about-us',
//     '/ru/about-us',
//     '/pt/about-us',
//     '/ja/about-us',
//     '/ko/about-us',
//     '/tr/about-us',
//     '/it/about-us',
//     '/id/about-us',
//     '/ms/about-us',
//     '/bn/about-us',
//     '/th/about-us',
//     '/fil/about-us',
//     '/zh/about-us',
//     '/zh-TW/about-us',
//     '/my/about-us',

//     '/ar/terms-and-conditions',
//     '/es/terms-and-conditions',
//     '/hi/terms-and-conditions',
//     '/fr/terms-and-conditions',
//     '/de/terms-and-conditions',
//     '/ru/terms-and-conditions',
//     '/pt/terms-and-conditions',
//     '/ja/terms-and-conditions',
//     '/ko/terms-and-conditions',
//     '/tr/terms-and-conditions',
//     '/it/terms-and-conditions',
//     '/id/terms-and-conditions',
//     '/ms/terms-and-conditions',
//     '/bn/terms-and-conditions',
//     '/th/terms-and-conditions',
//     '/fil/terms-and-conditions',
//     '/zh/terms-and-conditions',
//     '/zh-TW/terms-and-conditions',
//     '/my/terms-and-conditions',

//     '/ar/privacy-policy',
//     '/es/privacy-policy',
//     '/hi/privacy-policy',
//     '/fr/privacy-policy',
//     '/de/privacy-policy',
//     '/ru/privacy-policy',
//     '/pt/privacy-policy',
//     '/ja/privacy-policy',
//     '/ko/privacy-policy',
//     '/tr/privacy-policy',
//     '/it/privacy-policy',
//     '/id/privacy-policy',
//     '/ms/privacy-policy',
//     '/bn/privacy-policy',
//     '/th/privacy-policy',
//     '/fil/privacy-policy',
//     '/zh/privacy-policy',
//     '/zh-TW/privacy-policy',
//     '/my/privacy-policy',
//   ],

//   // 🌍 hreflang setup for homepage
//   alternateRefs: [
//     { href: 'https://url2video.online/', hreflang: 'x-default' },
//     { href: 'https://url2video.online/en', hreflang: 'en' },
//     { href: 'https://url2video.online/es', hreflang: 'es' },
//     { href: 'https://url2video.online/hi', hreflang: 'hi' },
//     { href: 'https://url2video.online/ar', hreflang: 'ar' },
//     { href: 'https://url2video.online/fr', hreflang: 'fr' },
//     { href: 'https://url2video.online/de', hreflang: 'de' },
//     { href: 'https://url2video.online/ru', hreflang: 'ru' },
//     { href: 'https://url2video.online/pt', hreflang: 'pt' },
//     { href: 'https://url2video.online/ja', hreflang: 'ja' },
//     { href: 'https://url2video.online/ko', hreflang: 'ko' },
//     { href: 'https://url2video.online/tr', hreflang: 'tr' },
//     { href: 'https://url2video.online/it', hreflang: 'it' },
//     { href: 'https://url2video.online/id', hreflang: 'id' },
//     { href: 'https://url2video.online/ms', hreflang: 'ms' },
//     { href: 'https://url2video.online/bn', hreflang: 'bn' },
//     { href: 'https://url2video.online/th', hreflang: 'th' },
//     { href: 'https://url2video.online/fil', hreflang: 'fil' },
//     { href: 'https://url2video.online/zh', hreflang: 'zh' },
//     { href: 'https://url2video.online/zh-TW', hreflang: 'zh-TW' },
//     { href: 'https://url2video.online/my', hreflang: 'my' },
//   ],
// };












/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://url2video.online',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.8,
  sitemapSize: 7000,
  autoLastmod: true,

  // ❌ Exclude localized duplicates completely
  exclude: [
    '/ar/about-us',
    '/es/about-us',
    '/hi/about-us',
    '/fr/about-us',
    '/de/about-us',
    '/ru/about-us',
    '/pt/about-us',
    '/ja/about-us',
    '/ko/about-us',
    '/tr/about-us',
    '/it/about-us',
    '/id/about-us',
    '/ms/about-us',
    '/bn/about-us',
    '/th/about-us',
    '/fil/about-us',
    '/zh/about-us',
    '/zh-TW/about-us',
    '/my/about-us',

    '/ar/terms-and-conditions',
    '/es/terms-and-conditions',
    '/hi/terms-and-conditions',
    '/fr/terms-and-conditions',
    '/de/terms-and-conditions',
    '/ru/terms-and-conditions',
    '/pt/terms-and-conditions',
    '/ja/terms-and-conditions',
    '/ko/terms-and-conditions',
    '/tr/terms-and-conditions',
    '/it/terms-and-conditions',
    '/id/terms-and-conditions',
    '/ms/terms-and-conditions',
    '/bn/terms-and-conditions',
    '/th/terms-and-conditions',
    '/fil/terms-and-conditions',
    '/zh/terms-and-conditions',
    '/zh-TW/terms-and-conditions',
    '/my/terms-and-conditions',

    '/ar/privacy-policy',
    '/es/privacy-policy',
    '/hi/privacy-policy',
    '/fr/privacy-policy',
    '/de/privacy-policy',
    '/ru/privacy-policy',
    '/pt/privacy-policy',
    '/ja/privacy-policy',
    '/ko/privacy-policy',
    '/tr/privacy-policy',
    '/it/privacy-policy',
    '/id/privacy-policy',
    '/ms/privacy-policy',
    '/bn/privacy-policy',
    '/th/privacy-policy',
    '/fil/privacy-policy',
    '/zh/privacy-policy',
    '/zh-TW/privacy-policy',
    '/my/privacy-policy',
  ],

  // 🌍 Default hreflang setup for all other pages
  alternateRefs: [
    { href: 'https://url2video.online/', hreflang: 'x-default' },
    { href: 'https://url2video.online/en', hreflang: 'en' },
    { href: 'https://url2video.online/es', hreflang: 'es' },
    { href: 'https://url2video.online/hi', hreflang: 'hi' },
    { href: 'https://url2video.online/ar', hreflang: 'ar' },
    { href: 'https://url2video.online/fr', hreflang: 'fr' },
    { href: 'https://url2video.online/de', hreflang: 'de' },
    { href: 'https://url2video.online/ru', hreflang: 'ru' },
    { href: 'https://url2video.online/pt', hreflang: 'pt' },
    { href: 'https://url2video.online/ja', hreflang: 'ja' },
    { href: 'https://url2video.online/ko', hreflang: 'ko' },
    { href: 'https://url2video.online/tr', hreflang: 'tr' },
    { href: 'https://url2video.online/it', hreflang: 'it' },
    { href: 'https://url2video.online/id', hreflang: 'id' },
    { href: 'https://url2video.online/ms', hreflang: 'ms' },
    { href: 'https://url2video.online/bn', hreflang: 'bn' },
    { href: 'https://url2video.online/th', hreflang: 'th' },
    { href: 'https://url2video.online/fil', hreflang: 'fil' },
    { href: 'https://url2video.online/zh', hreflang: 'zh' },
    { href: 'https://url2video.online/zh-TW', hreflang: 'zh-TW' },
    { href: 'https://url2video.online/my', hreflang: 'my' },
  ],

  // ⚙️ Custom transform to remove hreflangs from specific pages
  transform: async (config, path) => {
    // Exclude hreflang for these 3 main pages
    const noHreflangPages = [
      '/privacy-policy',
      '/terms-and-conditions',
      '/about-us',
    ];

    const isExcludedPage = noHreflangPages.some(p => path.includes(p));

    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: isExcludedPage ? [] : config.alternateRefs,
    };
  },
};


