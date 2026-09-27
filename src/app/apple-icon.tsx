import { ImageResponse } from "next/og";
import { brandMarkDataUri } from "@/lib/brand-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS rounds the corners itself, so the mark is drawn full-bleed here.
export default function AppleIcon() {
  return new ImageResponse(
    (
      // eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img>
      <img src={brandMarkDataUri({ rounded: false })} width={180} height={180} alt="" />
    ),
    size,
  );
}
