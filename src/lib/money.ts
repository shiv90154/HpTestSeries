/** "₹149" — whole rupees with Indian digit grouping (prices are stored in paise). */
export function rupees(paise: number): string {
  return `₹${(paise / 100).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}
