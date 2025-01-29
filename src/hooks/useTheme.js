import { useState, useEffect } from "react";
import { defineTheme } from "../services/themeManager";

const useTheme = (defaultTheme) => {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const initializeTheme = async () => {
      await defineTheme("oceanic-next");
      setTheme({ value: "oceanic-next", label: "Oceanic Next" });
    };

    initializeTheme();
  }, []);

  const handleThemeChange = async (selectedTheme) => {
    if (["light", "vs-dark"].includes(selectedTheme.value)) {
      setTheme(selectedTheme);
      // console.log("Selected theme: ", theme);
    } else {
      await defineTheme(selectedTheme.value);
      setTheme(selectedTheme);
    }
  };

  return { theme, handleThemeChange };
};

export default useTheme;
