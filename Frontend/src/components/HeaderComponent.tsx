














// // components/HeaderComponent.tsx
// import React, { useState } from "react";
// import NextLink from "next/link";
// import {
//   Box,
//   Flex,
//   HStack,
//   Link as ChakraLink,
//   Button,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   Stack,
//   Image,
//   useColorModeValue,
// } from "@chakra-ui/react";
// import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

// interface HeaderProps {
//   navLinks: { label: string; href: string }[];
//   languages: { label: string; value: string }[];
//   currentLocale: string;
// }

// export default function HeaderComponent({
//   navLinks,
//   languages,
//   currentLocale,
// }: HeaderProps) {
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleMenu = () => setIsOpen(!isOpen);

//   const currentLang =
//     languages.find((l) => l.value === currentLocale)?.label || "English";

//   return (
//     <Box
//       bg={useColorModeValue("white", "gray.800")}
//       px={6}
//       shadow="sm"
//       position="sticky"
//       top={0}
//       zIndex={1000}
//     >
//       <Flex h={16} alignItems="center" justifyContent="space-between">
//         {/* Logo */}
//         <HStack spacing={2}>
//           <Image
//             src="/headerlogo.png"
//             alt="URL2Video Logo"
//             cursor="pointer"
//             onClick={() =>
//               window.location.href = `/${currentLocale}`
//             }
//             height={{ base: "40px", sm: "50px", md: "70px", lg: "90px" }}
//             width="auto"
//             maxW={{ base: "120px", md: "150px", lg: "200px" }}
//           />
//         </HStack>

//         {/* Desktop Nav Links */}
//         <HStack
//           as="nav"
//           spacing={6}
//           display={{ base: "none", md: "flex" }}
//           fontWeight="medium"
//           color="gray.700"
//         >
//           {navLinks.map((link) => (
//             <NextLink key={link.label} href={link.href} passHref>
//               <ChakraLink
//                 _hover={{ color: "#29a744", transform: "scale(1.1)" }}
//                 transition="all 0.2s ease-in-out"
//               >
//                 {link.label}
//               </ChakraLink>
//             </NextLink>
//           ))}
//         </HStack>

//         {/* Actions */}
//         <HStack spacing={4}>
//           {/* Language Dropdown */}
//           <Menu placement="bottom-end">
//             <MenuButton
//               as={Button}
//               size="sm"
//               bg="white"
//               border="1px solid"
//               borderColor="gray.300"
//               rightIcon={<ChevronDownIcon />}
//               _hover={{ bg: "#e8fbe8", color: "#29a744" }}
//             >
//               {currentLang}
//             </MenuButton>

//             <MenuList zIndex={2000} maxH="650px" overflowY="auto">
//               {languages.map((lang) => {
//                 const href =
//                   lang.value === "en" ? "/" : `/${lang.value}`;
//                 return (
//                   <NextLink key={lang.value} href={href} passHref>
//                     <MenuItem as="a">{lang.label}</MenuItem>
//                   </NextLink>
//                 );
//               })}
//             </MenuList>
//           </Menu>

//           {/* About Button */}
//           <NextLink href="/about-us" passHref>
//             <Button
//               as="a"
//               size="sm"
//               px={6}
//               bg="#444444"
//               color="white"
//               _hover={{ bg: "gray.800" }}
//               display={{ base: "none", md: "inline-flex" }}
//             >
//               About
//             </Button>
//           </NextLink>

//           {/* Mobile Hamburger */}
//           <IconButton
//             size="md"
//             icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
//             aria-label="Open Menu"
//             display={{ md: "none" }}
//             onClick={toggleMenu}
//           />
//         </HStack>
//       </Flex>

//       {/* Mobile Menu */}
//       {isOpen && (
//         <Box pb={4} display={{ md: "none" }}>
//           <Stack as="nav" spacing={4}>
//             {navLinks.map((link) => (
//               <NextLink key={link.label} href={link.href} passHref>
//                 <ChakraLink>{link.label}</ChakraLink>
//               </NextLink>
//             ))}
//             <NextLink href="/about-us" passHref>
//               <Button size="sm" bg="gray.700" color="white" w="full" _hover={{ bg: "gray.600" }}>
//                 About
//               </Button>
//             </NextLink>
//           </Stack>
//         </Box>
//       )}
//     </Box>
//   );
// }














// components/HeaderComponent.tsx
import React, { useState } from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
  Button,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Stack,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from "@chakra-ui/icons";

interface HeaderProps {
  navLinks: { label: string; href: string }[];
  languages: { label: string; value: string }[];
  currentLocale: string;
}

export default function HeaderComponent({
  navLinks,
  languages,
  currentLocale,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => setIsOpen(!isOpen);

  const currentLang =
    languages.find((l) => l.value === currentLocale)?.label || "English";

  return (
    <Box
      bg={useColorModeValue("white", "gray.800")}
      px={6}
      shadow="sm"
      position="sticky"
      top={0}
      zIndex={1000}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <HStack spacing={2}>
          <Image
            src="/headerlogo.png"
            alt="URL2Video Logo"
            cursor="pointer"
            onClick={() => router.push(`/${currentLocale}`)}
            height={{ base: "60px", sm: "90px", md: "105px", lg: "110px" }}
            width="auto"
            maxW={{ base: "150px", md: "180px", lg: "230px" }}
          />
        </HStack>

        {/* Desktop Nav Links */}
        <HStack
          as="nav"
          spacing={6}
          display={{ base: "none", md: "flex" }}
          fontWeight="medium"
          color="gray.700"
        >
          {navLinks.map((link) => (
            <NextLink key={link.label} href={link.href} locale={currentLocale} passHref>
              <ChakraLink
                _hover={{ color: "#29a744", transform: "scale(1.1)" }}
                transition="all 0.2s ease-in-out"
              >
                {link.label}
              </ChakraLink>
            </NextLink>
          ))}
        </HStack>

        {/* Actions */}
        <HStack spacing={4}>
          {/* Language Dropdown */}
          <Menu placement="bottom-end">
            <MenuButton
              as={Button}
              size="sm"
              bg="white"
              border="1px solid"
              borderColor="gray.300"
              rightIcon={<ChevronDownIcon />}
              _hover={{ bg: "#e8fbe8", color: "#29a744" }}
            >
              {currentLang}
            </MenuButton>

            <MenuList zIndex={2000} maxH="650px" overflowY="auto">
              {languages.map((lang) => (
                <NextLink
                  key={lang.value}
                  href={router.asPath} // preserve current path
                  locale={lang.value} // switch locale
                  passHref
                >
                  <MenuItem as="a">{lang.label}</MenuItem>
                </NextLink>
              ))}
            </MenuList>
          </Menu>

          {/* About Button */}
          <NextLink href="/about-us" locale={currentLocale} passHref>
            <Button
              as="a"
              size="sm"
              px={6}
              bg="#444444"
              color="white"
              _hover={{ bg: "gray.800" }}
              display={{ base: "none", md: "inline-flex" }}
            >
              About
            </Button>
          </NextLink>

          {/* Mobile Hamburger */}
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={toggleMenu}
          />
        </HStack>
      </Flex>

      {/* Mobile Menu */}
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {navLinks.map((link) => (
              <NextLink key={link.label} href={link.href} locale={currentLocale} passHref>
                <ChakraLink>{link.label}</ChakraLink>
              </NextLink>
            ))}
            <NextLink href="/about-us" locale={currentLocale} passHref>
              <Button
                size="sm"
                bg="gray.700"
                color="white"
                w="full"
                _hover={{ bg: "gray.600" }}
              >
                About
              </Button>
            </NextLink>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
