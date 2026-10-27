import { useEffect, useState } from "react";

export const useCopyToClipboard = (resetAfter = 2000) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), resetAfter);
    return () => clearTimeout(timer);
  }, [copied, resetAfter]);

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return [copied, copy];
};
