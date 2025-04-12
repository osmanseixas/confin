import React, { useState, useRef, useEffect } from "react";
import styles from "./IconGridSelector.module.css";

export default function IconGridSelector({ icons, selected, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`${styles.selectorContainer} ${isOpen ? styles.open : ""}`}
      ref={containerRef}
    >
      <div
        className={styles.selectedIcon}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {icons[selected] || <span className={styles.placeholder}>...</span>}
      </div>

      {isOpen && (
        <div className={styles.iconGrid}>
          {Object.entries(icons).map(([key, IconComponent]) => (
            <button
              key={key}
              className={`${styles.iconButton} ${
                selected === key ? styles.selected : ""
              }`}
              onClick={() => {
                onSelect(key);
                setIsOpen(false);
              }}
            >
              {IconComponent}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
