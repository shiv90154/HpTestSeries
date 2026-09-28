"use client";

import { ImagePlus } from "lucide-react";
import { useRef, useTransition } from "react";
import { toast } from "sonner";
import { uploadImageAction } from "./uploads/actions";

/** "Upload image" for admin editors: uploads the picked file and hands back its URL. */
export function ImageUploadButton({ onUploaded, label = "Upload image" }: { onUploaded: (url: string) => void; label?: string }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [pending, startTransition] = useTransition();

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          e.target.value = "";
          if (!file) return;
          const form = new FormData();
          form.set("file", file);
          startTransition(async () => {
            const res = await uploadImageAction(form);
            if ("error" in res) toast.error(res.error);
            else {
              onUploaded(res.url);
              toast.success("Image uploaded");
            }
          });
        }}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={pending}
        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline disabled:opacity-50"
      >
        <ImagePlus className="size-3.5" /> {pending ? "Uploading…" : label}
      </button>
    </>
  );
}

/** Appends a markdown image on its own line. */
export const withImage = (text: string, url: string) => `${text.trimEnd()}${text.trim() ? "\n\n" : ""}![](${url})\n`;
