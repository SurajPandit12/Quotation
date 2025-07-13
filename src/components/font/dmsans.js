import { DM_Sans } from "next/font/google";

const dmsans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "font-family",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const dmsansfont = dmsans.variable;