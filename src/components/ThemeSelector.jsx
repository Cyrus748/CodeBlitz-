import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { themeStyles} from "../config/themeStyles";

const ThemeSelector = ({ handleThemeChange, theme }) => {

  const themeOptions = Object.entries(monacoThemes).map(([id, name]) => ({
    label: name,
    value: id,
  }));

  return (
    <Select
      placeholder="Select Theme"
      options={themeOptions}
      value={theme}
      styles={themeStyles}
      onChange={handleThemeChange}
    />
  );
};

export default ThemeSelector;
