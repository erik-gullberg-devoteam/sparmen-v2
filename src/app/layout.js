import { Inter } from "next/font/google";
import "./globals.css";
import styles from "@/app/page.module.css";
import GithubIcon from "../../components/Icons/GithubIcon";
import Link from "next/link";
import SearchBar from "../../components/SearchBar/SearchBar";
import LoginButton from "../../components/LoginButton/LoginButton";
import { Toaster } from "react-hot-toast";
import { TwoNumberInput } from "../../components/TwoNumberInput/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Spärmen",
  description: "Spex lyrics database",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Spärmen</title>
      </head>
      <body className={inter.className}>
        <Toaster position="bottom-right" />
        <div className={styles.navbar}>
          <LoginButton></LoginButton>
          <Link href="/">
            <h1>Spärmen</h1>
          </Link>
          <a
            href="https://github.com/erik-gullberg-devoteam/sparmen-v2"
            target="_blank"
          >
            <GithubIcon style={{ width: 35, height: 35 }} />
          </a>
        </div>
        <main className={styles.main}>
          <SearchBar></SearchBar>
          <br />
          <TwoNumberInput></TwoNumberInput>
          {children}
        </main>
      </body>
    </html>
  );
}
