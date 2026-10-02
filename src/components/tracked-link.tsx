"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "./analytics";

type Props = ComponentProps<typeof Link> & {
  /** GA4 event sent on click, e.g. "landing_cta_click". A no-op while GA is not configured. */
  event: string;
  params?: Record<string, string | number | boolean>;
};

/** A Link that reports the click to GA4, so ad campaigns can be judged by which button on which exam page was used. */
export function TrackedLink({ event, params, onClick, ...props }: Props) {
  return (
    <Link
      {...props}
      onClick={(e) => {
        track(event, params);
        onClick?.(e);
      }}
    />
  );
}
