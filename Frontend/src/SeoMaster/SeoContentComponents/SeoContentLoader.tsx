






// import {
//   Box,
//   Heading,
//   Text,
//   VStack,
//   List,
//   ListItem,
//   Image,
//   SimpleGrid,
//   useColorModeValue,
// } from "@chakra-ui/react";

// interface SeoContent {
//   seconadykeywordheading: string;
//   fourhundredwordparagraph: string;
//   featuresHeading: string;
//   featuresList: string[];
//   image1?: string;
//   image2?: string;
//   howtodownloadheadingwithsecondarykeyword: string;
//   howtodownloadlist: string[];
//   whyuseourdownloaderheading: string;
//   unorderlist: string[];
//   keyworddownloaderaimheading: string;
//   paragraph: string[];
//   whatisheadingkeyword: string;
//   paragraph2: string;
// }

// interface Props {
//   seoData: SeoContent;
// }

// export default function SeoContentLoader({ seoData }: Props) {
//   if (!seoData) return null;

//   const cardBg = useColorModeValue("white", "gray.100");
//   const softText = useColorModeValue("gray.700", "gray.300");
//   const headingColor = useColorModeValue("gray.900", "white");

//   return (
//     <Box as="section" w="100%" py={16} px="0">
//       <Box
//         bg={cardBg}
//         rounded="3xl"
//         shadow="0 10px 40px rgba(0,0,0,0.06)"
//         w="100%"
//         px={{ base: 6, md: 16 }}
//         py={{ base: 8, md: 16 }}
//       >
//         <VStack spacing={16} align="start" w="100%">
//           {/* MAIN HEADING */}
//           <Heading
//             as="h2"
//             size="2xl"
//             color={headingColor}
//             fontWeight="700"
//             letterSpacing="-0.5px"
//           >
//             {seoData.seconadykeywordheading}
//           </Heading>

//           {/* INTRO PARAGRAPH */}
//           <Text fontSize="lg" color={softText} lineHeight="tall">
//             {seoData.fourhundredwordparagraph}
//           </Text>

//           {/* FEATURES LIST */}
//           <Box w="full">
//             <Heading as="h3" size="xl" mb={5} color={headingColor}>
//               {seoData.featuresHeading}
//             </Heading>
//             <List spacing={3} pl={6} styleType="disc" color={softText}>
//               {seoData.featuresList.map((item, i) => (
//                 <ListItem key={i}>{item}</ListItem>
//               ))}
//             </List>
//           </Box>

          
// <Box
//   display="grid"
//   gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
//   gap={{ base: 8, md: 14 }}
//   alignItems="start"
// >
//   <Box display="flex" flexDirection="column" justifyContent="flex-start">
//     <Heading as="h3" size="xl" mb={2} color={headingColor}>
//       {seoData.howtodownloadheadingwithsecondarykeyword}
//     </Heading>
//     <List spacing={3} pl={6} styleType="decimal" color={softText}>
//       {seoData.howtodownloadlist.map((step, i) => (
//         <ListItem key={i}>{step}</ListItem>
//       ))}
//     </List>
//   </Box>

//   {seoData.image1 && (
//     <Box display="flex" justifyContent="flex-start">
//       <Image
//         src={seoData.image1}
//         alt="How to download"
//         rounded="2xl"
//         shadow="0 20px 40px rgba(0,0,0,0.08)"
//         objectFit="cover"
//         maxW={{ base: "100%", md: "500px" }}
//         w="100%"
//         h="auto"
//       />
//     </Box>
//   )}
// </Box>

// {/* WHY USE OUR DOWNLOADER: Image Left, Text Right */}
// <Box
//   display="grid"
//   gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
//   gap={{ base: 8, md: 14 }}
//   alignItems="start"
// >
//   {seoData.image2 && (
//     <Box display="flex" justifyContent="flex-start">
//       <Image
//         src={seoData.image2}
//         alt="Why use our downloader"
//         rounded="2xl"
//         shadow="0 20px 40px rgba(0,0,0,0.08)"
//         objectFit="cover"
//         maxW={{ base: "100%", md: "500px" }}
//         w="100%"
//         h="auto"
//       />
//     </Box>
//   )}

//   <Box display="flex" flexDirection="column" justifyContent="flex-start">
//     <Heading as="h3" size="xl" mb={2} color={headingColor}>
//       {seoData.whyuseourdownloaderheading}
//     </Heading>
//     <List spacing={3} pl={6} styleType="disc" color={softText}>
//       {seoData.unorderlist.map((item, i) => (
//         <ListItem key={i}>{item}</ListItem>
//       ))}
//     </List>
//   </Box>
// </Box>


//           {/* SEO/Keyword Section */}
//           <Box>
//             <Heading as="h3" size="xl" mb={4} color={headingColor}>
//               {seoData.keyworddownloaderaimheading}
//             </Heading>
//             {seoData.paragraph.map((p, i) => (
//               <Text key={i} fontSize="lg" color={softText} lineHeight="tall" mb={3}>
//                 {p}
//               </Text>
//             ))}
//           </Box>

//           {/* WHAT IS / CONCLUSION */}
//           <Box>
//             <Heading as="h3" size="xl" mb={4} color={headingColor}>
//               {seoData.whatisheadingkeyword}
//             </Heading>
//             <Text fontSize="lg" color={softText} lineHeight="tall">
//               {seoData.paragraph2}
//             </Text>
//           </Box>
//         </VStack>
//       </Box>
//     </Box>
//   );
// }














import {
  Box,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  Image,
  SimpleGrid,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import NextLink from "next/link";

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

export default function SeoContentLoader({ seoData, platformLinks }: Props) {
  if (!seoData) return null;

  const cardBg = useColorModeValue("white", "gray.100");
  const softText = useColorModeValue("gray.700", "gray.300");
  const headingColor = useColorModeValue("gray.900", "white");

  const linkCardBg = useColorModeValue("white", "gray.700");
  const linkTextColor = useColorModeValue("gray.900", "white");
  const linkShadow = "0 10px 30px rgba(0,0,0,0.06)";

  return (
    <Box as="section" w="100%" py={16} px="0">
      <Box
        bg={cardBg}
        rounded="3xl"
        shadow="0 10px 40px rgba(0,0,0,0.06)"
        w="100%"
        px={{ base: 6, md: 16 }}
        py={{ base: 8, md: 16 }}
      >
        <VStack spacing={16} align="start" w="100%">
          {/* MAIN HEADING */}
          <Heading
            as="h2"
            size="2xl"
            color={headingColor}
            fontWeight="700"
            letterSpacing="-0.5px"
          >
            {seoData.seconadykeywordheading}
          </Heading>

          {/* INTRO PARAGRAPH */}
          <Text fontSize="lg" color={softText} lineHeight="tall">
            {seoData.fourhundredwordparagraph}
          </Text>

          {/* FEATURES LIST */}
          <Box w="full">
            <Heading as="h3" size="xl" mb={5} color={headingColor}>
              {seoData.featuresHeading}
            </Heading>
            <List spacing={3} pl={6} styleType="disc" color={softText}>
              {seoData.featuresList.map((item, i) => (
                <ListItem key={i}>{item}</ListItem>
              ))}
            </List>
          </Box>

         {/* HOW TO DOWNLOAD */}
<SimpleGrid
  columns={{ base: 1, md: 2 }}
  spacing={{ base: 10, md: 16 }}
  alignItems="center"
  w="100%"
>
  {/* TEXT LEFT */}
  <Box>
    <Heading as="h3" size="xl" mb={4} color={headingColor}>
      {seoData.howtodownloadheadingwithsecondarykeyword}
    </Heading>

    <List spacing={3} pl={6} styleType="decimal" color={softText}>
      {(seoData.howtodownloadlist || []).map((step, i) => (
        <ListItem key={i}>{step}</ListItem>
      ))}
    </List>
  </Box>

  {/* IMAGE RIGHT */}
  {seoData.image1 && (
    <Box w="100%" display="flex" justifyContent="center">
      <Image
        src={seoData.image1}
        alt="How to download"
        rounded="2xl"
        shadow="0 20px 40px rgba(0,0,0,0.08)"
        objectFit="cover"
        w="100%"
        maxW="520px"
      />
    </Box>
  )}
</SimpleGrid>


{/* WHY USE OUR DOWNLOADER */}
<SimpleGrid
  columns={{ base: 1, md: 2 }}
  spacing={{ base: 10, md: 16 }}
  alignItems="center"
  w="100%"
>
  {/* IMAGE LEFT */}
  {seoData.image2 && (
    <Box w="100%" display="flex" justifyContent="center">
      <Image
        src={seoData.image2}
        alt="Why use our downloader"
        rounded="2xl"
        shadow="0 20px 40px rgba(0,0,0,0.08)"
        objectFit="cover"
        w="100%"
        maxW="520px"
      />
    </Box>
  )}

  {/* TEXT RIGHT */}
  <Box>
    <Heading as="h3" size="xl" mb={4} color={headingColor}>
      {seoData.whyuseourdownloaderheading}
    </Heading>

    <List spacing={3} pl={6} styleType="disc" color={softText}>
      {seoData.unorderlist.map((item, i) => (
        <ListItem key={i}>{item}</ListItem>
      ))}
    </List>
  </Box>
</SimpleGrid>


          {/* SEO/Keyword Section */}
          <Box>
            <Heading as="h3" size="xl" mb={4} color={headingColor}>
              {seoData.keyworddownloaderaimheading}
            </Heading>
            {seoData.paragraph.map((p, i) => (
              <Text key={i} fontSize="lg" color={softText} lineHeight="tall" mb={3}>
                {p}
              </Text>
            ))}
          </Box>

          {/* WHAT IS / CONCLUSION */}
          <Box>
            <Heading as="h3" size="xl" mb={4} color={headingColor}>
              {seoData.whatisheadingkeyword}
            </Heading>
            <Text fontSize="lg" color={softText} lineHeight="tall">
              {seoData.paragraph2}
            </Text>
          </Box>

          {/* PLATFORM LINKS BLOCK */}
          
          {platformLinks && platformLinks.length > 0 && (
            <Box w="100%" py={8}>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                {platformLinks.map((link, i) => (
                  <NextLink key={i} href={link.href} passHref>
                    <Box
                      as="a"
                      bg={linkCardBg}
                      shadow={linkShadow}
                      rounded="2xl"
                      display="flex"
                      alignItems="center"
                      p={4}
                      transition="all 0.2s ease-in-out"
                      _hover={{
                        transform: "translateY(-4px)",
                        shadow: "0 15px 40px rgba(0,0,0,0.1)",
                      }}
                    >
                      <Image
                        src={link.icon}
                        alt={`${link.name} icon`}
                        boxSize="50px"
                        objectFit="contain"
                        mr={4}
                      />
                      <Text fontSize="lg" fontWeight="600" color={linkTextColor}>
                        {link.name}
                      </Text>
                    </Box>
                  </NextLink>
                ))}
              </SimpleGrid>
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
