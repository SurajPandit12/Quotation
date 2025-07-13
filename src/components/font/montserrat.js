import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: 'swap',
  variable: 'font-family',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const montserratfont = montserrat.variable;