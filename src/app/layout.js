import { Inter } from "next/font/google";
import "./globals.css";
import styles from "@/app/page.module.css";
import HamburgerIcon from "../../components/Icons/HamburgerIcon";
import GithubIcon from "../../components/Icons/GithubIcon";
import Link from "next/link";
import SearchBar from "../../components/SearchBar/SearchBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Spärmen</title>
      </head>
      <body className={inter.className}>
        <div className={styles.navbar}>
          <HamburgerIcon style={{ width: 35, height: 35 }} />
          <Link href="/">
            <h1>Spärmen</h1>
          </Link>
          <a href="https://github.com/erik-gullberg-devoteam/sparmen-v2">
            <GithubIcon style={{ width: 35, height: 35 }} />
          </a>
        </div>
        <main className={styles.main}>
          <SearchBar></SearchBar>
          {children}
        </main>
      </body>
    </html>
  );
}
