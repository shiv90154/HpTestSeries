// Pure HP wallet rules (no DB), kept separate so they are unit-testable and usable from client code.
import { MIN_CHARGE_PAISE } from "./coupon-input";

/** A wallet reservation on an order that is still unpaid after this long is given back to the student. */
export const STALE_RESERVATION_MINUTES = 30;

/**
 * How much of `totalPaise` the wallet pays and how much is left for Razorpay. The wallet may cover everything
 * (the order is then free of cash), but never leaves a cash part below Razorpay's ₹1 minimum.
 */
export function splitWallet(totalPaise: number, balancePaise: number): { walletPaise: number; cashPaise: number } {
  const total = Math.max(0, totalPaise);
  let wallet = Math.min(Math.max(0, balancePaise), total);
  const rest = total - wallet;
  if (rest > 0 && rest < MIN_CHARGE_PAISE) wallet = Math.max(0, total - MIN_CHARGE_PAISE);
  return { walletPaise: wallet, cashPaise: total - wallet };
}
