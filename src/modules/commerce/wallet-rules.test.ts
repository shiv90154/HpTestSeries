import { describe, expect, it } from "vitest";
import { splitWallet } from "./wallet-rules";

describe("splitWallet", () => {
  it("uses the whole balance when it is smaller than the price", () => {
    expect(splitWallet(19900, 5000)).toEqual({ walletPaise: 5000, cashPaise: 14900 });
  });

  it("covers the price fully when the balance is enough", () => {
    expect(splitWallet(14900, 20000)).toEqual({ walletPaise: 14900, cashPaise: 0 });
    expect(splitWallet(14900, 14900)).toEqual({ walletPaise: 14900, cashPaise: 0 });
  });

  it("does nothing with an empty or negative wallet", () => {
    expect(splitWallet(19900, 0)).toEqual({ walletPaise: 0, cashPaise: 19900 });
    expect(splitWallet(19900, -300)).toEqual({ walletPaise: 0, cashPaise: 19900 });
  });

  it("never leaves less than Razorpay's ₹1 minimum to charge", () => {
    expect(splitWallet(14900, 14850)).toEqual({ walletPaise: 14800, cashPaise: 100 });
    expect(splitWallet(14900, 14801)).toEqual({ walletPaise: 14800, cashPaise: 100 });
    expect(splitWallet(14900, 14800)).toEqual({ walletPaise: 14800, cashPaise: 100 });
  });

  it("leaves tiny prices to cash entirely", () => {
    expect(splitWallet(50, 30)).toEqual({ walletPaise: 0, cashPaise: 50 });
  });

  it("handles a zero price", () => {
    expect(splitWallet(0, 5000)).toEqual({ walletPaise: 0, cashPaise: 0 });
  });
});
