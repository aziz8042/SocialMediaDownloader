

// // pages/_app.tsx
// import { AppProps } from "next/app";
// import { ChakraProvider } from "@chakra-ui/react";
// import { appWithTranslation } from "next-i18next";
// import { useMemo, useState } from "react";
// import { createTheme } from "@/theme";
// import { getDirection } from "@/i18n-locale-config";
// import { nextI18NextConfig } from "../../next-i18next.config";

// import "@/styles/globals.css";

// function MyApp({ Component, pageProps, router }: AppProps) {
//   const locale = router.locale ?? router.defaultLocale ?? "en";
//   const direction = getDirection(locale);

//   // ✅ Theme is stable for both SSR and CSR
//   const theme = useMemo(() => createTheme(direction), [direction]);

//   // ✅ Simple loader (client-only)
//   const [loading, setLoading] = useState(false);
//   // useEffect(() => {
//   //   const timer = setTimeout(() => setLoading(false), 1500);
//   //   return () => clearTimeout(timer);
//   // }, []);
//   setLoading(false)
//   return (
//     <>
      

//    <ChakraProvider theme={theme}>
 
//   {loading && (
//     <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
//       <div className="flex space-x-3">
//         <div
//           className="w-4 h-4 bg-red-400 rounded-full animate-jiggle-bounce"
//           style={{ animationDelay: "0s" }}
//         />
//         <div
//           className="w-4 h-4 bg-blue-400 rounded-full animate-jiggle-bounce"
//           style={{ animationDelay: "0.2s" }}
//         />
//         <div
//           className="w-4 h-4 bg-yellow-400 rounded-full animate-jiggle-bounce"
//           style={{ animationDelay: "0.4s" }}
//         />
//       </div>
//     </div>
//   )}

  
//   <Component {...pageProps} />
// </ChakraProvider>

//     </>
//   );
// }

// export default appWithTranslation(MyApp, nextI18NextConfig);





// pages/_app.tsx
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { appWithTranslation } from "next-i18next";
import { useMemo, useState, useEffect } from "react";
import { createTheme } from "@/theme";
import { getDirection } from "@/i18n-locale-config";
import { nextI18NextConfig } from "../../next-i18next.config";
import { useRouter } from "next/router";

import "@/styles/globals.css";

function MyApp({ Component, pageProps, router }: AppProps) {
  const locale = router.locale ?? router.defaultLocale ?? "en";
  const direction = getDirection(locale);
  const theme = useMemo(() => createTheme(direction), [direction]);

  const nextRouter = useRouter();
  const [loading, setLoading] = useState(false);

  // ✅ Real-time loader – starts when a route or resource is actually loading
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    nextRouter.events.on("routeChangeStart", handleStart);
    nextRouter.events.on("routeChangeComplete", handleStop);
    nextRouter.events.on("routeChangeError", handleStop);

    return () => {
      nextRouter.events.off("routeChangeStart", handleStart);
      nextRouter.events.off("routeChangeComplete", handleStop);
      nextRouter.events.off("routeChangeError", handleStop);
    };
  }, [nextRouter]);

  return (
    <ChakraProvider theme={theme}>
      {/* ✅ Realtime loader – appears automatically while the page actually loads */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-[9999] transition-opacity duration-300">
          <div className="flex space-x-3">
            <div
              className="w-4 h-4 bg-red-400 rounded-full animate-jiggle-bounce"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="w-4 h-4 bg-blue-400 rounded-full animate-jiggle-bounce"
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className="w-4 h-4 bg-yellow-400 rounded-full animate-jiggle-bounce"
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </div>
      )}

      {/* ✅ Main app content */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
