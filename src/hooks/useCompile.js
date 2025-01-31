import { useState } from "react";
import axios from "axios";

const useCompile = (language, code, setOutputDetails, showErrorToast, showSuccessToast) => {
  const [processing, setProcessing] = useState(false);

  const handleCompile = async () => {
    setProcessing(true);

    const formData = {
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      script: code,
      language: language.name,
      versionIndex: "0", // Adjust this based on the language version you want to use
    };

    try {
      const response = await axios.post(import.meta.env.VITE_RAPID_URL, formData, {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
        },
      });

      setOutputDetails(response.data);
      showSuccessToast("Compiled Successfully!");
    } catch (error) {
      console.error("Compilation Error:", error);
      showErrorToast("Something went wrong while compiling!");
    } finally {
      setProcessing(false);
    }
  };

  return { handleCompile, processing };
};

export default useCompile;
