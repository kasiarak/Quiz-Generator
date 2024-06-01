import {Overpass} from "next/font/google";
import Head from "next/head";
import Header from "./components/Header/Header";
import ScrollUpButton from "./components/ScrollUpButton/ScrollUpButton";
import "./globals.css";

const overpass = Overpass({
  subsets: ['latin'],
  weight: ['800'], 
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Quiz Generator</title>
      </Head>
      <body className={overpass.className}><ScrollUpButton/><Header/>{children}</body>
    </html>
  );
}
