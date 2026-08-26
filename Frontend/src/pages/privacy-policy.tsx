

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
} from "@chakra-ui/react";
import HeaderComponent from "@/components/HeaderComponent";
import FooterComponent from "@/components/FooterComponent";

const PrivacyandPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - Safe & Secure Video Downloader | url2video</title>
        <meta
          name="description"
          content="Read the Privacy Policy of url2video.online. Learn how we protect your personal data, ensure safety, and provide a secure, ad-free online video downloading experience."
        />
        <meta
          name="keywords"
          content="privacy policy, url2video privacy, data protection, secure video downloader, safe video download, url2video policy"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="url2video.online" />
        <link rel="canonical" href="https://url2video.online/privacy-policy" />
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


      <Container maxW="4xl" py={10}>
        <Stack spacing={8}>
          <Heading as="h1" size="xl" textAlign="center">
            Privacy Policy
          </Heading>

          <VStack spacing={6} align="stretch">
            <Box>
              <Text>
                At <strong>url2video.online</strong>, your safety and privacy are our
                top priorities. We are fully committed to ensuring that your experience
                with our website is completely secure, free from spam, and respectful
                of your personal information.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                1. Free and Safe to Use
              </Heading>
              <Text>
                Our Service is 100% free for all users. We do not require any payment,
                subscriptions, or hidden fees. The website is designed to provide a
                safe and seamless video downloading experience without intrusive ads or
                malicious content.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                2. No Spam or Unwanted Messages
              </Heading>
              <Text>
                We never send spam, promotional emails, or unwanted messages to our
                users. Your email or personal information will never be sold, shared,
                or used for unsolicited marketing. Our platform is entirely free of
                spam or third-party interference.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                3. Data Safety and Security
              </Heading>
              <Text>
                We do not collect IP addresses, MAC addresses, or any other private
                personal information. Videos downloaded through our Service are stored
                temporarily and automatically deleted from our servers after 15 minutes.
                We use industry-standard security measures to ensure that any temporary
                data is protected while on the server.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                4. Cookies and Tracking
              </Heading>
              <Text>
                Our website may use minimal cookies to enhance functionality and improve
                user experience. We do not track your activity across other websites, and
                no personal information is shared with third parties.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                5. User Rights
              </Heading>
              <Text>
                You have full control over any information you share with us. If you ever
                wish to request removal of any data or have questions about your privacy,
                you can contact us directly, and we will respond promptly.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                6. Commitment to Transparency
              </Heading>
              <Text>
                We are committed to being fully transparent about how our Service works
                and how we handle user data. Our goal is to provide a trustworthy and
                reliable platform for all video downloading needs without compromising
                your privacy or safety.
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

export default PrivacyandPolicy;
