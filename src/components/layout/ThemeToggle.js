import React, { useState, useEffect } from "react";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Carrega o tema salvo ou o do sistema (logo no início)
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;

      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return prefersDark ? "dark" : "light";
    }
    return "light"; // fallback
  });

  // Aplica o tema sempre que mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <label className={styles.toggleContainer}>
      <div className={styles.switchWrapper}>
        <input
          type="checkbox"
          checked={isDark}
          onChange={() => setTheme(isDark ? "light" : "dark")}
          className={styles.hiddenCheckbox}
        />
        <div className={`${styles.track} ${isDark ? styles.trackChecked : ""}`}>
          <span className={styles.iconLeft}>☀️</span>
          <span className={styles.iconRight}>🌙</span>
        </div>
        <div className={`${styles.thumb} ${isDark ? styles.thumbChecked : ""}`} />
      </div>
    </label>
  );
}
