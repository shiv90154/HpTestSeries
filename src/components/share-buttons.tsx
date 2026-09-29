"use client";

import { Link2, Send, Share2 } from "lucide-react";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";
import { track } from "./analytics";

const noopSubscribe = () => () => {};

/**
 * WhatsApp / Telegram / copy-link share row, plus the native share sheet on phones.
 * Students sharing in exam WhatsApp/Telegram groups is our main off-page channel.
 */
export function ShareButtons({ url, text, label = "Share with friends" }: { url: string; text: string; label?: string }) {
  // false on the server and during hydration, then the real value — no hydration mismatch.
  const canNativeShare = useSyncExternalStore(noopSubscribe, () => "share" in navigator, () => false);
  const message = `${text}\n${url}`;
  const btnCls = "inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-surface px-3.5 text-sm font-medium hover:border-primary hover:text-primary";

  const log = (method: string) => track("share", { method, content_type: "page", item_id: url });

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {canNativeShare && (
          <button
            type="button"
            className={btnCls}
            onClick={async () => {
              try {
                await navigator.share({ text, url });
                log("native");
              } catch {
                // user closed the share sheet
              }
            }}
          >
            <Share2 className="size-4" /> Share
          </button>
        )}
        <a
          href={`https://wa.me/?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnCls} text-[#118376]`}
          onClick={() => log("whatsapp")}
        >
          <svg viewBox="0 0 24 24" aria-hidden className="size-4 fill-current">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2l-.5-.3Z" />
          </svg>
          WhatsApp
        </a>
        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`${btnCls} text-[#1b7caa]`}
          onClick={() => log("telegram")}
        >
          <Send className="size-4" /> Telegram
        </a>
        <button
          type="button"
          className={btnCls}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(url);
              toast.success("Link copied");
              log("copy");
            } catch {
              toast.error("Couldn't copy — long-press the address bar instead");
            }
          }}
        >
          <Link2 className="size-4" /> Copy link
        </button>
      </div>
    </div>
  );
}
