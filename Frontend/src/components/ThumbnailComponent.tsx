

import React from "react";

import { DownloadResult } from "@/pages";
import {
  Box,
  Flex,
  Image,
  Text,
  VStack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PremiumComponent from "./PremiumComponent";
import { useTranslation } from "next-i18next";

type Option = {
  label: string;
  value: string;
};

type ThumbnailProps = {
  thumbnail: string;
  title: string;
  duration: string;
  taskId: string | null;
  format?: string;
  onTaskIdChange?: (id: string) => void;
  options?: Option[];
  onFormatChange: (format: string) => Promise<DownloadResult>;
  visible?: boolean;
};
// ✅ Helper function to format seconds → hh:mm:ss
function formatDuration(seconds: number | string): string {
  const totalSeconds = Math.floor(Number(seconds)); // 👈 floor to avoid float artifacts
  if (isNaN(totalSeconds) || totalSeconds < 0) return "0:00";

  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  const formatted =
    h > 0
      ? `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
      : `${m}:${s.toString().padStart(2, "0")}`;

  return formatted;
}


function ThumbnailComponent({
  thumbnail,
  title,
  duration,
  taskId,
  format,
  options = [],
  onFormatChange,
  visible = true,
}: ThumbnailProps) {
  const { t } = useTranslation("common");

  if (!visible) return null;

  // ✅ This simply triggers parent function; no blob fetching here
  const handleSelect = async (selectedFormat: string) => {
    if (!taskId) return;
    try {
      await onFormatChange(selectedFormat);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  // Find quick formats (720p, 480p, MP3/audio)
  const quickFormats = [
    options.find((o) => /720/i.test(o.label)),
    options.find((o) => /480/i.test(o.label)),
    options.find((o) => /(mp3|audio)/i.test(o.label)),
  ].filter(Boolean) as Option[];

  return (
    <Box
      mt={8}
      borderWidth="1px"
      borderRadius="md"
      p={4}
      bg="white"
      shadow="sm"
      maxW="850px"
      mx="auto"
    >
      <Flex gap={6} direction={{ base: "column", md: "row" }} align="flex-start">
        {/* Thumbnail image + title/duration */}
       <Box flexShrink={0} mx="auto" maxW={{ base: "100%", md: "280px" }}>
  <Image
    src={thumbnail}
    alt={title}
    w={{ base: "100%", md: "280px" }}
    h={{ base: "200px", md: "180px" }}
    objectFit="cover"
    borderRadius="md"
  />
  <VStack align="start" spacing={0} mt={3} w="full">
    <Text
      fontSize="sm"
      fontWeight="semibold"
      noOfLines={5}            // ✅ wraps to 2 lines max
      wordBreak="break-word"   // ✅ breaks long words if needed
      whiteSpace="normal"      // ✅ allows wrapping
      maxW="full"              // ✅ ensures stays within box
    >
      {title}
    </Text>
    <Text fontSize="xs" color="gray.600">
  {t("Duration")}: {formatDuration(duration)}
</Text>

  </VStack>
</Box>


        {/* Quick buttons + dropdown */}
        <VStack align="stretch" flex="1" spacing={3} w="100%">
          {/* Quick Download Buttons */}
          {quickFormats.map((item, i) => (
            <Flex
              key={i}
              align="center"
              justify="space-between"
              w="100%"
              bg="#444"
              p={2}
              rounded="md"
            >
              <Flex
                flex="1"
                bg="gray.100"
                color="black"
                rounded="md"
                px={4}
                py={2}
                align="center"
              >
                <Text fontSize="sm" fontWeight="medium">
                  {item.label}
                </Text>
              </Flex>
              <Button
                size="sm"
                bg="#01a65a"
                color="white"
                ml={3}
                _hover={{ bg: "#01914d" }}
                onClick={() => handleSelect(item.value)}
              >
                Download
              </Button>
            </Flex>
          ))}

          {/* Dropdown with all formats */}
          {options.length > 0 && (
            <Menu isLazy matchWidth>
              <MenuButton
                as={Button}
                w="100%"
                textAlign="left"
                size="sm"
                rounded="md"
                bg="gray.100"
                borderWidth="1px"
                rightIcon={<ChevronDownIcon />}
              >
                Select Quality
              </MenuButton>

              <MenuList minW="unset" w="100%">
                {options.map((opt, i) => (
                  <MenuItem key={i} w="100%" p={0}>
                    <Flex justify="space-between" align="center" w="100%" px={3} py={2}>
                      <Text color={format === opt.value ? "green.500" : "black"}>
                        {opt.label}
                      </Text>
                      <Button
                        size="xs"
                        bg="#01a65a"
                        color="white"
                        _hover={{ bg: "#01914d" }}
                        onClick={() => handleSelect(opt.value)}
                      >
                        Download
                      </Button>
                    </Flex>
                  </MenuItem>
                ))}
              </MenuList>

              <PremiumComponent />
            </Menu>
          )}
        </VStack>
      </Flex>
    </Box>
  );
}

export default ThumbnailComponent;
