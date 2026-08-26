
import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  VStack,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import Script from "next/script";
import { useTranslation } from "next-i18next";
import { API_BASE_URL } from "@/apis/api";

type ProgressProps = {
  isOpen: boolean;
  loading: boolean;
  taskId?: string | null;
  downloadUrl?: string | null; // ✅ backend-provided full URL if available
  onClose?: () => void;
};

function ProgressComponent({
  isOpen,
  loading,
  taskId,
  downloadUrl,
  onClose = () => {},
}: ProgressProps) {
  const { t } = useTranslation("common");
  const [downloading, setDownloading] = useState(false);

  // 🧠 Detect extension dynamically from downloadUrl or default to mp4
  const getFileExtension = (url?: string | null): string => {
    if (!url) return "mp4";
    const match = url.match(/\.([a-zA-Z0-9]+)(?:\?|$)/);
    return match ? match[1] : "mp4";
  };

  // ✅ Directly trigger Nginx-served download when ready
  useEffect(() => {
    if (!loading && isOpen && (downloadUrl || taskId)) {
      setDownloading(true);

      // Prefer backend-provided URL, else build fallback
      const ext = getFileExtension(downloadUrl);
      const fileUrl =
        downloadUrl || `${API_BASE_URL}/user_videos/${taskId}.${ext}`;

      const filename = fileUrl.split("/").pop() || `${taskId}.${ext}`;

      const a = document.createElement("a");
      a.href = fileUrl;
      a.setAttribute("download", filename);
      document.body.appendChild(a);
      a.click();
      a.remove();

      setTimeout(() => setDownloading(false), 2000);
    }
  }, [loading, taskId, downloadUrl, isOpen]);

  return (
    <>
      <Script
        type="text/javascript"
        src="//widget.trustpilot.com/bootstrap/v5/tp.widget.bootstrap.min.js"
        strategy="afterInteractive"
        async
      />

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
        <ModalOverlay bg="blackAlpha.600" />
        <ModalContent rounded="lg" overflow="hidden" p={6}>
          <ModalCloseButton />

          <ModalBody>
            <VStack spacing={6} textAlign="center">
              {loading ? (
                <>
                  <Text fontWeight="bold" fontSize="lg">
                     Loading...
                  </Text>

                  <CircularProgress
                    isIndeterminate
                    color="green.400"
                    size="80px"
                    thickness="8px"
                  >
                    <CircularProgressLabel>⚡</CircularProgressLabel>
                  </CircularProgress>

                  <Text fontSize="sm" color="gray.600">
                     Please wait while we prepare your download...
                  </Text>
                </>
              ) : (
                <>
                  <Text fontWeight="bold" fontSize="lg">
                    Your file is ready!
                  </Text>

                  <Button
                    bg="#29a744"
                    color="white"
                    _hover={{ bg: "#23963b" }}
                    px={8}
                    onClick={() => {
                      if (!taskId && !downloadUrl) return;

                      const ext = getFileExtension(downloadUrl);
                      const fileUrl =
                        downloadUrl || `${API_BASE_URL}/user_videos/${taskId}.${ext}`;
                      const filename =
                        fileUrl.split("/").pop() || `${taskId}.${ext}`;

                      const a = document.createElement("a");
                      a.href = fileUrl;
                      a.setAttribute("download", filename);
                      document.body.appendChild(a);
                      a.click();
                      a.remove();
                    }}
                    isDisabled={downloading || (!taskId && !downloadUrl)}
                  >
                    
                      {downloading ? "Downloading..." : "Download Now"}
                  </Button>

                  <Text fontSize="sm" textAlign="center" color="gray.700">
                    <Text as="span" fontWeight="bold">
                      Enjoying our downloader?
                    </Text>{" "}
                    <br />
                    Your feedback helps us improve <br />
                    Thank you for supporting us!
                  </Text>

                  <Button
                    as="a"
                    href="https://www.trustpilot.com/review/urltovideo.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    bg="#f4ffee"
                    color="#29a744"
                    borderWidth="1px"
                    _hover={{ bg: "#e8fbe8" }}
                    px={6}
                    py={3}
                    rounded="md"
                    fontWeight="semibold"
                    fontSize="sm"
                    shadow="sm"
                  >
                    TrustPilot
                  </Button>
                </>
              )}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ProgressComponent;
