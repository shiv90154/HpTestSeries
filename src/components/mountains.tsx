/** Decorative Himalayan ridge used at the bottom of hero sections. */
export function Mountains({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 220" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path d="M0 220 L0 150 L120 90 L220 140 L340 60 L460 130 L560 80 L700 150 L820 70 L940 130 L1060 50 L1180 120 L1300 80 L1440 140 L1440 220 Z" fill="rgba(255,255,255,0.07)" />
      <path d="M0 220 L0 180 L160 120 L300 170 L420 110 L560 175 L700 120 L860 180 L1000 115 L1150 170 L1290 125 L1440 175 L1440 220 Z" fill="rgba(255,255,255,0.10)" />
      <path d="M0 220 L0 205 L200 170 L380 200 L560 165 L760 205 L960 170 L1160 200 L1320 175 L1440 200 L1440 220 Z" fill="var(--background)" />
    </svg>
  );
}
