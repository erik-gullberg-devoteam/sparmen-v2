"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { useRouter } from "next/navigation";

export function TwoNumberInput() {
  const router = useRouter();

  const [firstNum, setFirstNum] = useState("");
  const [secondNum, setSecondNum] = useState("");

  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);

  const handleFirstNumChange = (e) => {
    const value = e.target.value;
    setFirstNum(value);

    if (value.length === 2) {
      secondInputRef.current.focus();
    }
  };

  const handleSecondNumChange = (e) => {
    const value = e.target.value;
    setSecondNum(value);

    if (value.length === 0) {
      firstInputRef.current.focus();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      router.push(`/song/${firstNum}.${secondNum}`);
    }
  };

  return (
    <div>
      <input
        className={styles.smallSearchBar}
        type="number"
        value={firstNum}
        onChange={handleFirstNumChange}
        placeholder="Spexnr"
        ref={firstInputRef}
      />
      <span> . </span>
      <input
        className={styles.smallSearchBar}
        type="number"
        value={secondNum}
        onChange={handleSecondNumChange}
        onKeyDown={handleKeyDown}
        placeholder="Låtnr"
        ref={secondInputRef}
      />

      <button className={styles.button} id={styles.smallButton}>
        <Link
          href={{
            pathname: `/song/${firstNum}.${secondNum}`,
          }}
        >
          Direktsök
        </Link>
      </button>
    </div>
  );
}
