// // src/components/PremiumComponent.tsx
// import React from "react";
// import { Flex, Text, Box } from "@chakra-ui/react";

// import { FaCrown as StarIcon } from "react-icons/fa6";

// import { useRouter } from "next/router";

// function PremiumComponent() {
//   const router = useRouter();

//   const handleClick = () => {
//     router.push("/Purchase-Preium-Quality");
//   };

//   return (
//     <Flex
//       align="center"
//       bg="goldenrod"
//       color="white"
//       rounded="full"
//       px={4}
//       py={2}
//       cursor="pointer"
//       shadow="md"
//       _hover={{ opacity: 0.9 }}
//       onClick={handleClick}
//       maxW="fit-content"
//       mx="auto"
//     >
//       {/* Icon inside dark circle */}
//       <Box
//         bg="gray.700"
//         rounded="full"
//         w="24px"
//         h="24px"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         mr={3}
//       >
//         <StarIcon  color="gold" />
//       </Box>

//       {/* Text */}
//       <Text fontSize="sm" fontWeight="medium" whiteSpace="nowrap">
//         1080, 2K, 4K, 8K are Available in Premium
//       </Text>
//     </Flex>
//   );
// }

// export default PremiumComponent;


import React from 'react'

function PremiumComponent() {
  return (
    <span></span>
  )
}

export default PremiumComponent