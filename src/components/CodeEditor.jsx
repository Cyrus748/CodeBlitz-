import React, { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = (props) => {

  const{ onChange, language, code, theme } = props
  

  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange("code", value);
  };

  return (
    <div className="overlay rounded-md overflow-hidden w-full h-full shadow-4xl">
      <Editor
        height="70vh"
        width={`100%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue="//Welcome to CodeBlitz ⚡"
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditor;

