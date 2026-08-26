


// // pages/about.tsx
// import React from "react";
// import Head from "next/head";
// import {
//   Box,
//   Container,
//   Heading,
//   Text,
//   VStack,
//   Stack,
//   Divider,
//   Link,
// } from "@chakra-ui/react";
// import HeaderComponent from "@/components/HeaderComponent";
// import FooterComponent from "@/components/FooterComponent";

// const About = () => {
//   return (
//     <>
//       <Head>
//         <title>About URL2Video - Free Online Video Downloader | url2video</title>
//         <meta
//           name="description"
//           content="Learn more about URL2Video, a free online video downloader developed by SafeX Solutions. Discover our mission to provide secure, ad-free, and user-friendly video downloading tools."
//         />
//         <meta
//           name="keywords"
//           content="about url2video, video downloader, safex solutions, free video downloader, online downloader, url2video team"
//         />
//         <meta name="robots" content="index, follow" />
//         <meta name="author" content="url2video.online" />
//         <link rel="canonical" href="https://url2video.online/about-us" />
//         <link rel="icon" href="/favicon.ico" sizes="any" />
//       <link rel="apple-touch-icon" href="/favicon.ico" />
//       <meta name="theme-color" content="#ffffff" />
//       </Head>

//       <HeaderComponent></HeaderComponent>
//       <Container maxW="3xl" py={12}>
//         <Stack spacing={10}>
//           <Heading as="h1" size="2xl" textAlign="center">
//             About Us
//           </Heading>

//           <VStack spacing={8} align="stretch">
//             {/* Intro Section */}
//             <Box>
//               <Text fontSize="lg" lineHeight="tall">
//                 <Link href="https://safexsolutions.com" color="blue.500" isExternal>
//                   SafeX Solutions
//                 </Link>{" "}
//                 developed <strong>URL2Video</strong> as a lightweight and efficient video downloading tool. It is designed to make downloading videos simple and accessible for everyone. Our focus is on providing a safe, spam-free, and highly user-friendly experience.
//               </Text>
//             </Box>

//             <Divider />

//             {/* Video Use Disclaimer */}
//             <Box>
//               <Heading as="h2" size="md" mb={2}>
//                 Video Usage
//               </Heading>
//               <Text lineHeight="tall">
//                 All videos available through this service are intended for personal,
//                 educational, or non-commercial use only. Do not download or distribute
//                 copyrighted content without permission. We are not responsible for any
//                 misuse of downloaded material.
//               </Text>
//             </Box>

//             <Divider />

//             {/* Software Development */}
//             <Box>
//               <Heading as="h2" size="md" mb={2}>
//                 Custom Software Development
//               </Heading>
//               <Text lineHeight="tall">
//                 We also provide custom software development services on order. If you
//                 want to create custom software or applications, you can contact us at:
//               </Text>
//               <Text mt={2} color="blue.500">
//                 contact@urltovideo.online <br />
//                 contact@safexsolutions.com
//               </Text>
//             </Box>

//             <Divider />

//             {/* Founders and Team */}
//             <Box>
//               <Heading as="h2" size="md" mb={2}>
//                 Our Team
//               </Heading>
//               <Text lineHeight="tall">
//                 The founder of{" "}
//                 <Link href="https://safexsolutions.com" color="blue.500" isExternal>
//                   SafeX Solutions
//                 </Link>{" "}
//                 is <strong>Ateeq Ullah</strong>. The URL2Video tool is developed and maintained by <strong>Aziz Ullah</strong> and his team, committed to delivering high-quality software solutions.
//               </Text>
//             </Box>
//           </VStack>
//         </Stack>
//       </Container>
//       <FooterComponent></FooterComponent>
//     </>
//   );
// };

// // SSG: Pre-render at build time
// export const getStaticProps = async () => {
//   return {
//     props: {},
//   };
// };

// export default About;




// ✅ Disable other locales — only build English
export const config = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

import React from "react";
import Head from "next/head";
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Stack,
  Divider,
  Link,
} from "@chakra-ui/react";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";

const About = () => {
  return (
    <>
      <Head>
        <title>About URL2Video - Free Online Video Downloader | url2video</title>
        <meta
          name="description"
          content="Learn more about URL2Video, a free online video downloader developed by SafeX Solutions. Discover our mission to provide secure, ad-free, and user-friendly video downloading tools."
        />
        <meta
          name="keywords"
          content="about url2video, video downloader, safex solutions, free video downloader, online downloader, url2video team"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="url2video.online" />
        <link rel="canonical" href="https://url2video.online/about-us" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ffffff" />
      </Head>

       <HeaderComponent
        navLinks={[]}           // empty array for now
        languages={[{ label: "English", value: "en" }]}
           // just English for now
        currentLocale="en"      // default to English
      />
      
      <Container maxW="3xl" py={12}>
        <Stack spacing={10}>
          <Heading as="h1" size="2xl" textAlign="center">
            About Us
          </Heading>

          <VStack spacing={8} align="stretch">
            <Box>
              <Text fontSize="lg" lineHeight="tall">
                <Link href="https://safexsolutions.com" color="blue.500" isExternal>
                  SafeX Solutions
                </Link>{" "}
                developed <strong>URL2Video</strong> as a lightweight and efficient
                video downloading tool. It is designed to make downloading videos
                simple and accessible for everyone. Our focus is on providing a safe,
                spam-free, and highly user-friendly experience.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Video Usage
              </Heading>
              <Text lineHeight="tall">
                All videos available through this service are intended for personal,
                educational, or non-commercial use only. Do not download or distribute
                copyrighted content without permission. We are not responsible for any
                misuse of downloaded material.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Custom Software Development
              </Heading>
              <Text lineHeight="tall">
                We also provide custom software development services on order. If you
                want to create custom software or applications, you can contact us at:
              </Text>
              <Text mt={2} color="blue.500">
                contact@urltovideo.online <br />
                contact@safexsolutions.com
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                Our Team
              </Heading>
              <Text lineHeight="tall">
                The founder of{" "}
                <Link href="https://safexsolutions.com" color="blue.500" isExternal>
                  SafeX Solutions
                </Link>{" "}
                is <strong>Ateeq Ullah</strong>. The URL2Video tool is developed and
                maintained by <strong>Aziz Ullah</strong> and his team, committed to
                delivering high-quality software solutions.
              </Text>
            </Box>
          </VStack>
        </Stack>
      </Container>
      <FooterComponent />
    </>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default About;
