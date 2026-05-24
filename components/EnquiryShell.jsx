"use client";

import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EnquiryModal from "@/components/EnquiryModal";
import FloatingChatButton from "@/components/FloatingChatButton";

const SESSION_KEY = "sharkeduEnquiryModalSeen";

export default function EnquiryShell({ children }) {
  const [modalOpen, setModalOpen] = useState(false);
  const hasTriggered = useRef(false);
  const timeoutRef = useRef(null);
  const scrollHandlerRef = useRef(null);

  const closeModal = () => {
    setModalOpen(false);
  };

  const openModal = (source = "manual") => {
    if (source === "auto" && hasTriggered.current) return;

    hasTriggered.current = true;
    setModalOpen(true);

    try {
      sessionStorage.setItem(SESSION_KEY, "true");
    } catch (error) {
      // Ignore storage write failures
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (scrollHandlerRef.current) {
      window.removeEventListener("scroll", scrollHandlerRef.current);
      scrollHandlerRef.current = null;
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const hasSeen = sessionStorage.getItem(SESSION_KEY) === "true";
      if (hasSeen) return;
    } catch (error) {
      // Ignore storage read failures
    }

    timeoutRef.current = window.setTimeout(() => {
      openModal("auto");
    }, 0);

    const handleScroll = () => {
      if (hasTriggered.current) return;
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      if (pageHeight > 0 && scrollPosition / pageHeight >= 0.4) {
        openModal("auto");
      }
    };

    scrollHandlerRef.current = handleScroll;
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (scrollHandlerRef.current) {
        window.removeEventListener("scroll", scrollHandlerRef.current);
        scrollHandlerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [modalOpen]);

  return (
    <>
      <Header onOpenEnquiry={openModal} />
      <main>{children}</main>
      <Footer onOpenEnquiry={openModal} />
      <FloatingChatButton onClick={openModal} />
      <EnquiryModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
