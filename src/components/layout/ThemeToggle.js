import React, { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      className="mb-4 px-4 py-2 rounded-xl bg-gray-200 dark:bg-gray-700 text-sm"
    >
      Alternar para {theme === "light" ? "Tema Escuro" : "Tema Claro"}
    </button>
  );
}
