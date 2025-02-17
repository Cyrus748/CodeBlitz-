// useCompile.js

import { useState } from "react";
import axios from "axios";

const useCompile = (language, code, setOutputDetails, showErrorToast, showSuccessToast) => {
  const [processing, setProcessing] = useState(false);

  const handleCompile = async () => {
    setProcessing(true);

    const formData = {
      clientId: process.env.REACT_APP_JDOODLE_CLIENT_ID,
      clientSecret: process.env.REACT_APP_JDOODLE_CLIENT_SECRET,
      script: code,
      language: language.jdoodleId,
      versionIndex: "0",
    };

    try {
      const response = await axios.post("https://api.jdoodle.com/v1/execute", formData, {
        headers: { "Content-Type": "application/json" },
      });

      setProcessing(false);

      if (response.data.error) {
        showErrorToast(response.data.error);
      } else {
        setOutputDetails(response.data);
        showSuccessToast("Compiled Successfully!");
      }
    } catch (error) {
      console.error("JDoodle API Error:", error);
      showErrorToast("Something went wrong. Try again!");
      setProcessing(false);
    }
  };

  return { handleCompile, processing };
};

export default useCompile;
