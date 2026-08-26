

// pages/terms-and-conditions.tsx
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

const Termsandconditions = () => {
  return (
    <>
      <Head>
        <title>Terms and Conditions - Legal Use Policy | url2video</title>
        <meta
          name="description"
          content="Read the Terms and Conditions for url2video. Learn about your rights, responsibilities, and usage policies before using our free online video downloader."
        />
        <meta
          name="keywords"
          content="terms and conditions, url2video policy, video downloader terms, usage policy, url2video legal, url2video terms"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="url2video.online" />
        <link rel="canonical" href="https://url2video.online/terms-and-conditions" />
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
            Terms and Conditions
          </Heading>

          <VStack spacing={6} align="stretch">
            <Box>
              <Text>
                Please review these terms and conditions of use carefully before
                using our website and services:
              </Text>
              <Text mt={2}>url2video.online and the URL2Video website.</Text>
              <Text mt={2}>
                These Terms govern your use of our website and related services
                (collectively, the “Service”). The words “you” or “your” refer to any
                individual or entity using the Service.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                1. Acceptance of Terms
              </Heading>
              <Text>
                By accessing or using the Service, you agree to these Terms. If you do
                not agree, you must immediately stop using the Service.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                2. Eligibility
              </Heading>
              <Text>
                You must be at least 18 years old to use the Service. You may be
                required to create an account for certain features. You are solely
                responsible for keeping your account information secure.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                3. Grant of Use
              </Heading>
              <Text>
                We grant you a limited, non-exclusive, non-transferable right to access
                and use the Service for personal, educational, or non-commercial
                purposes. This grant may be terminated at any time if you violate these
                Terms or misuse the Service.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                4. Content and Intellectual Property
              </Heading>
              <Text>
                All content on the Service, including text, videos, graphics, and other
                materials, is owned or licensed by us. You may not copy, modify,
                distribute, or create derivative works without permission.
              </Text>
              <Text mt={2}>
                All videos available through this Service are intended for personal,
                educational, or non-commercial use only. Do not download, share, or
                distribute copyrighted content without permission. We are not
                responsible for any misuse of downloaded material.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                5. User Responsibilities
              </Heading>
              <Text>
                You are solely responsible for all content you upload, submit, or
                share using the Service. You must ensure that you have all necessary
                rights, permissions, or licenses to any content you use with the Service.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                6. User Conduct
              </Heading>
              <Text>
                You agree to use the Service lawfully and responsibly. This includes
                not infringing others’ rights, not transmitting viruses, and not
                overloading our servers. Violations may result in restricted access or
                termination of your account.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                7. Fees and Payments
              </Heading>
              <Text>
                We may offer premium features that require payment. All fees and
                billing policies will be communicated clearly. No refunds will be
                issued for account termination due to violation of these Terms.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                8. Privacy Policy
              </Heading>
              <Text>
                By using the Service, you acknowledge our{" "}
                <Link color="blue.500" href="/privacy-policy">
                  Privacy Policy
                </Link>{" "}
                and agree to the collection and use of information as described therein.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                9. Copyright Claims
              </Heading>
              <Text>
                We respect intellectual property rights. Any infringement claims will
                be addressed promptly. Repeat infringers may have their access
                terminated.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                10. Modifications
              </Heading>
              <Text>
                We may update or modify these Terms at any time. Continued use of the
                Service constitutes acceptance of any changes.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                11. Disclaimer of Warranties and Limitation of Liability
              </Heading>
              <Text>
                The Service is provided “AS-IS” without warranties of any kind. We are
                not responsible for any direct or indirect damages arising from the use
                or inability to use the Service.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                12. Governing Law
              </Heading>
              <Text>
                These Terms are governed by international law principles. Any disputes
                will be resolved through applicable legal channels in accordance with
                prevailing law.
              </Text>
            </Box>

            <Divider />

            <Box>
              <Heading as="h2" size="md" mb={2}>
                13. General Terms
              </Heading>
              <Text>
                These Terms represent the complete agreement between you and us. Section
                headings are for convenience only. If any provision is found invalid or
                unenforceable, the remainder of the Terms will remain in effect.
              </Text>
            </Box>
          </VStack>
        </Stack>
      </Container>

      <FooterComponent></FooterComponent>
    </>
  );
};

// SSG: Pre-render this page at build time
export const getStaticProps = async () => {
  return {
    props: {}, // no dynamic props, static content only
  };
};

export default Termsandconditions;
