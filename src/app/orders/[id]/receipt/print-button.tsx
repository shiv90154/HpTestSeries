"use client";

import { Printer } from "lucide-react";
import { btn } from "@/components/ui";

/** Opens the browser print dialog — "Save as PDF" there gives the student a PDF receipt. */
export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={btn("primary", "sm")}>
      <Printer className="size-4" /> Print / Save PDF
    </button>
  );
}
