

// import React from "react";
// import {
//   Box,
//   Accordion,
//   AccordionItem,
//   AccordionButton,
//   AccordionPanel,
//   AccordionIcon,
//   Heading,
//   VStack,
// } from "@chakra-ui/react";

// interface FaqItem {
//   question: string;
//   answer: string;
// }

// interface Props {
//   faqs: FaqItem[];
// }

// export default function SeoFaqsLoader({ faqs }: Props) {
//   if (!faqs.length) return null;

//   return (
//     <Box as="section" py={12} px={{ base: 4, md: 16 }} bg="gray.50">
//       <VStack spacing={8} maxW="4xl" mx="auto" align="stretch">
//         <Heading as="h2" size="2xl" textAlign="center" mb={6}>
//           Frequently Asked Questions
//         </Heading>

//         <Accordion allowMultiple>
//           {faqs.map((faq, index) => (
//         <AccordionItem key={index}>
//   <h3>
//     <AccordionButton py={5}> {/* Adds vertical spacing */}
//       <Box flex="1" textAlign="left" fontWeight="bold">
//         {faq.question}
//       </Box>
//       <AccordionIcon />
//     </AccordionButton>
//   </h3>
//   <AccordionPanel pb={4}>{faq.answer}</AccordionPanel>
// </AccordionItem>
//           ))}
//         </Accordion>
//       </VStack>
//     </Box>
//   );
// }




import React, { useState } from "react";
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Heading,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon } from "@chakra-ui/icons";

interface FaqItem {
  question: string;
  answer: string;
}

interface Props {
  faqs: FaqItem[];
}

export default function SeoFaqsLoader({ faqs }: Props) {
  if (!faqs.length) return null;

  const allIndexes = faqs.map((_, index) => index);

  return (
    <Box as="section" py={12} px={{ base: 4, md: 16 }} bg="gray.50">
      <VStack spacing={8} maxW="4xl" mx="auto" align="stretch">
        <Heading as="h2" size="2xl" textAlign="center" mb={6}>
          Frequently Asked Questions
        </Heading>

        <Accordion allowMultiple defaultIndex={allIndexes}>
          {faqs.map((faq, index) => (
            <AccordionItem key={index}>
              {({ isExpanded }) => (
                <>
                  <h3>
                    <AccordionButton py={6} fontSize="lg">
                      <Box flex="1" textAlign="left" fontWeight="bold" fontSize="xl">
                        {faq.question}
                      </Box>
                      {isExpanded ? (
                        <MinusIcon w={6} h={6} />
                      ) : (
                        <AddIcon w={6} h={6} />
                      )}
                    </AccordionButton>
                  </h3>
                  <AccordionPanel pb={6} fontSize="lg" lineHeight="tall">
                    {faq.answer}
                  </AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </VStack>
    </Box>
  );
}
