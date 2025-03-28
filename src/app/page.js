import styles from "./page.module.css";
import SpexList from "../components/SpexList/SpexList";
import TopList from "../components/TopList/TopList";
import { Suspense } from "react";
import SearchBar from "@/components/SearchBar/SearchBar";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <SearchBar />
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h3>Top 10</h3>
        </div>
        <div>
          <Suspense fallback={<div>Laddar top 10...</div>}>
            <TopList></TopList>
          </Suspense>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.containerHeader}>
          <h3>Spex</h3>
        </div>
        <div>
          <Suspense fallback={<div>Laddar spex...</div>}>
            <SpexList></SpexList>
          </Suspense>
        </div>
      </div>
    </div>
  );
}
