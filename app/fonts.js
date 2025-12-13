import localFont from "next/font/local";

export const global = localFont({
  src: "../public/fonts/global.woff2",
  variable: "--font-global",
  subsets: ["latin"],
  display: "swap",
});

export const syne = localFont({
  src: [
    {
      path: "../public/fonts/syne/Syne-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/syne/Syne-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/syne/Syne-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/syne/Syne-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/syne/Syne-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-syne",
  subsets: ["latin"],
});

export const alanSans = localFont({
  src: [
    {
      path: "../public/fonts/alan_sans/AlanSans-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/alan_sans/AlanSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/alan_sans/AlanSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/alan_sans/AlanSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/alan_sans/AlanSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/alan_sans/AlanSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/alan_sans/AlanSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-alan-sans",
  subsets: ["latin"],
});