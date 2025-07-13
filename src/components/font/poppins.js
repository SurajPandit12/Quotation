import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "font-family",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const poppinsfont = poppins.className;
