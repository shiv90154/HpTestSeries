import "server-only";
import { db } from "@/lib/db";

export type OrderListItem = {
  id: string;
  userId: string | null; // null: guest order nobody has claimed yet
  userName: string;
  userEmail: string;
  productTitle: string;
  amountPaise: number;
  status: string;
  razorpayOrderId: string | null;
  paymentId: string | null;
  site: string; // domain the order was placed on
  createdAt: Date;
};

export async function listOrders(site: string | null = null, limit = 200): Promise<OrderListItem[]> {
  const orders = await db.order.findMany({
    where: site ? { site } : {},
    orderBy: { createdAt: "desc" },
    take: limit,
    select: {
      id: true,
      userId: true,
      amountPaise: true,
      status: true,
      razorpayOrderId: true,
      payerEmail: true,
      site: true,
      createdAt: true,
      user: { select: { name: true, email: true } },
      product: { select: { title: true } },
      payments: { select: { razorpayPaymentId: true }, take: 1, orderBy: { createdAt: "desc" } },
    },
  });
  return orders.map((o) => ({
    id: o.id,
    userId: o.userId,
    userName: o.user?.name ?? "Guest (not signed up yet)",
    userEmail: o.user?.email ?? o.payerEmail ?? "",
    productTitle: o.product.title,
    amountPaise: o.amountPaise,
    status: o.status,
    razorpayOrderId: o.razorpayOrderId,
    paymentId: o.payments[0]?.razorpayPaymentId ?? null,
    site: o.site,
    createdAt: o.createdAt,
  }));
}
