"use client";

import { useWindowSize } from "@/hooks/useWindowSize";
import { ICONS } from "@/shared/icons/resources";
import { useEffect, useRef, useState } from "react";

export function SheetShare({ citation }: { citation?: string }) {
  const width = useWindowSize();
  const isDesktop = width >= 768;
  const [isMobileShareOpen, setIsMobileShareOpen] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isCiteCopied, setIsCiteCopied] = useState(false);
  const linkCopyTimeoutRef = useRef<number | null>(null);
  const citeCopyTimeoutRef = useRef<number | null>(null);
  const isShareOpen = isDesktop || isMobileShareOpen;

  const toggleShare = () => {
    if (isDesktop) return;
    setIsMobileShareOpen((prev) => !prev);
  };

  const isLocalHostname = (hostname: string) => {
    return (
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.endsWith(".local")
    );
  };

  const resolveShareUrl = () => {
    const currentUrl = new URL(window.location.href);
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

    if (!siteUrl) {
      return currentUrl.toString();
    }

    try {
      const siteBase = new URL(siteUrl);
      if (
        isLocalHostname(currentUrl.hostname) &&
        !isLocalHostname(siteBase.hostname)
      ) {
        const resolvedUrl = new URL(
          currentUrl.pathname + currentUrl.search,
          siteBase,
        );
        return resolvedUrl.toString();
      }
    } catch (error) {
      console.error("Invalid NEXT_PUBLIC_SITE_URL value:", error);
    }

    return currentUrl.toString();
  };

  const isPublicShareUrl = (url: string) => {
    try {
      return !isLocalHostname(new URL(url).hostname);
    } catch {
      return false;
    }
  };

  const notifyNonPublicUrl = () => {
    window.alert(
      "Social share preview is not available for localhost URLs. Use a public URL (staging/production domain or tunnel).",
    );
  };

  const getShareData = () => {
    const url = resolveShareUrl();
    const title = document.title || "HYFE";
    return { url, title };
  };

  const openShareWindow = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer,width=620,height=700");
  };

  const copyText = async (text: string) => {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
  };

  const resetCopiedState = (type: "link" | "cite") => {
    if (type === "link") {
      if (linkCopyTimeoutRef.current) {
        window.clearTimeout(linkCopyTimeoutRef.current);
      }
      setIsLinkCopied(true);
      linkCopyTimeoutRef.current = window.setTimeout(
        () => setIsLinkCopied(false),
        2000,
      );
      return;
    }

    if (citeCopyTimeoutRef.current) {
      window.clearTimeout(citeCopyTimeoutRef.current);
    }
    setIsCiteCopied(true);
    citeCopyTimeoutRef.current = window.setTimeout(
      () => setIsCiteCopied(false),
      2000,
    );
  };

  const shareToTwitter = () => {
    const { url, title } = getShareData();
    if (!isPublicShareUrl(url)) {
      notifyNonPublicUrl();
      return;
    }
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
    openShareWindow(shareUrl);
  };

  const shareToFacebook = () => {
    const { url } = getShareData();
    if (!isPublicShareUrl(url)) {
      notifyNonPublicUrl();
      return;
    }
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    openShareWindow(shareUrl);
  };

  const shareToLinkedIn = () => {
    const { url } = getShareData();
    if (!isPublicShareUrl(url)) {
      notifyNonPublicUrl();
      return;
    }
    const shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    openShareWindow(shareUrl);
  };

  const handleCopyLink = async () => {
    try {
      const { url } = getShareData();
      await copyText(url);
      resetCopiedState("link");
    } catch (error) {
      console.error("Copy link failed:", error);
    }
  };

  const handleCopyCitation = async () => {
    if (!citation?.trim()) return;

    try {
      await copyText(citation.trim());
      resetCopiedState("cite");
    } catch (error) {
      console.error("Copy citation failed:", error);
    }
  };

  useEffect(() => {
    return () => {
      if (linkCopyTimeoutRef.current) {
        window.clearTimeout(linkCopyTimeoutRef.current);
      }
      if (citeCopyTimeoutRef.current) {
        window.clearTimeout(citeCopyTimeoutRef.current);
      }
    };
  }, []);

  const Twitter = ICONS.Twitter;
  const Copy = ICONS.Copy;
  const Facebook = ICONS.Facebook;
  const Linkedin = ICONS.Linkedin;
  const Quote = ICONS.Quote;
  const Share = ICONS.Share;
  const hasCitation = Boolean(citation?.trim());

  return (
    <div className="fixed flex flex-col md:flex-row gap-2  mx-auto bottom-4 md:bottom-auto md:top-3 right-4 md:left-8 z-1000 ">
      <button   
        onClick={toggleShare}
        className="z-100000 md:hidden w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)] hover:scale-110 duration-300 z-1000"
      >
        <Share className="text-black " />
      </button>
      <button
        aria-label="Copy page link"
        title="Copy page link"
        onClick={handleCopyLink}
        className={`${isShareOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)]" : "absolute"} ${isLinkCopied ? "px-3" : "w-10"} h-10 rounded-full bg-white flex justify-center items-center cursor-pointer hover:scale-110 duration-300 z-1000`}
      >
        {isLinkCopied ? (
          <span className="text-[12px] font-semibold">Copied</span>
        ) : (
          <Copy className="text-black" />
        )}
      </button>
      <button
        aria-label="Share on X (Twitter)"
        title="Share on X (Twitter)"
        onClick={shareToTwitter}
        className={`${isShareOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)]" : "absolute"} w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer  hover:scale-110 duration-300 z-1000`}
      >
        <Twitter className="text-black" />
      </button>

      <button
        aria-label="Share on Facebook"
        title="Share on Facebook"
        onClick={shareToFacebook}
        className={`${isShareOpen ? "shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)]" : "absolute"} w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer  hover:scale-110 duration-300 z-1000`}
      >
        <Facebook className="text-black" />
      </button>
      <button
        aria-label="Share on LinkedIn"
        title="Share on LinkedIn"
        onClick={shareToLinkedIn}
        className={`${isShareOpen ? "" : "absolute"} w-10 h-10 rounded-full bg-white  flex justify-center items-center cursor-pointer shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)] hover:scale-110 duration-300 z-1000`}
      >
        <Linkedin className="text-black" />
      </button>

      {hasCitation && (
        <button
          aria-label="Copy citation"
          title="Copy citation"
          onClick={handleCopyCitation}
          className={`${isShareOpen ? "px-4 shadow-[0_10px_30px_rgba(0,0,0,0.20)] border border-black/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.30)]" : "absolute w-10 h-10"}   font-semibold h-10 rounded-full bg-white  flex justify-center items-center gap-2 cursor-pointer  hover:scale-110 duration-300 z-1000`}
        >
          <Quote className="text-black" /> {isShareOpen && (isCiteCopied ? "Copied" : "Cite")}
        </button>
      )}
    </div>
  );
}
