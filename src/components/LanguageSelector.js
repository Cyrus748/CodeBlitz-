// LanguageSelector.js

import React from "react";
import languages from "./languages";

const LanguageSelector = ({ selectedLanguage, setSelectedLanguage }) => {
  return (
    <select
      value={selectedLanguage.id}
      onChange={(e) => {
        const lang = languages.find((lang) => lang.id === Number(e.target.value));
        setSelectedLanguage(lang);
      }}
    >
      {languages.map((lang) => (
        <option key={lang.id} value={lang.id}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};

export default LanguageSelector;
