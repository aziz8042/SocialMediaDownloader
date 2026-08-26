// // components/FooterComponent.tsx
// import { Box, Container, Flex, Text, Link, HStack } from "@chakra-ui/react";

// export default function FooterComponent() {
//   return (
//     <Box bg="#444444" color="gray.200" py={6} mt={10}>
//       <Container maxW="7xl">
//         <Flex
//           direction={{ base: "column", md: "row" }}
//           justify="space-between"
//           align="center"
//           textAlign={{ base: "center", md: "left" }}
//           gap={3}
//         >
//           {/* Left side - Links */}
//           <HStack spacing={4} mb={{ base: 2, md: 0 }}>
//             <Link
//               href="/about-us"
//               color="gray.300"
//               _hover={{ color: "white", textDecoration: "underline" }}
//             >
//               About Us
//             </Link>
//             <Link
//               href="/terms-and-conditions"
//               color="gray.300"
//               _hover={{ color: "white", textDecoration: "underline" }}
//             >
//               Terms & Conditions
//             </Link>
//             <Link
//               href="/privacy-policy"
//               color="gray.300"
//               _hover={{ color: "white", textDecoration: "underline" }}
//             >
//               Privacy Policy
//             </Link>
//           </HStack>

//           {/* Middle - Copyright */}
//           <Text fontSize="sm" color="gray.300" textAlign="center">
//             © {new Date().getFullYear()} URL2Video — All Rights Reserved
//           </Text>

//           {/* Right side - Developer link */}
//           <Link
//             href="https://safexsolutions.com"
//             isExternal
//             fontSize="sm"
//             color="gray.300"
//             _hover={{ color: "white", textDecoration: "underline" }}
//           >
//             Developed by <Text as="span" fontWeight="bold">SafeX Solutions</Text>
//           </Link>
//         </Flex>
//       </Container>
//     </Box>
//   );
// }




// components/FooterComponent.tsx
import { Box, Container, Flex, Text, Link, HStack } from "@chakra-ui/react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterProps {
  links?: FooterLink[]; // links like About, Privacy, Terms
  developerName?: string;
  developerUrl?: string;
  companyName?: string;
}

export default function FooterComponent({
  links = [
    { label: "About Us", href: "/about-us" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
  developerName = "SafeX Solutions",
  developerUrl = "https://safexsolutions.com",
  companyName = "URL2Video",
}: FooterProps) {
  return (
    <Box bg="#444444" color="gray.200" py={6} mt={10}>
      <Container maxW="7xl">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align="center"
          textAlign={{ base: "center", md: "left" }}
          gap={3}
        >
          {/* Left side - Links */}
          <HStack spacing={4} mb={{ base: 2, md: 0 }}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                color="gray.300"
                _hover={{ color: "white", textDecoration: "underline" }}
              >
                {link.label}
              </Link>
            ))}
          </HStack>

          {/* Middle - Copyright */}
          <Text fontSize="sm" color="gray.300" textAlign="center">
            © {new Date().getFullYear()} {companyName} — All Rights Reserved
          </Text>

          {/* Right side - Developer link */}
          <Link
            href={developerUrl}
            isExternal
            fontSize="sm"
            color="gray.300"
            _hover={{ color: "white", textDecoration: "underline" }}
          >
            Developed by <Text as="span" fontWeight="bold">{developerName}</Text>
          </Link>
        </Flex>
      </Container>
    </Box>
  );
}

