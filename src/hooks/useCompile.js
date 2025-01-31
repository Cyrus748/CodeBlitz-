import { useState } from "react";
import axios from "axios";

const useCompile = (
  language,
  code,
  setOutputDetails,
  showErrorToast,
  showSuccessToast
) => {
  const [processing, setProcessing] = useState(false);

  const handleCompile = async () => {
    setProcessing(true);

    const formData = {
      clientId: import.meta.env.VITE_RAPID_CLIENT_ID,
      clientSecret: import.meta.env.VITE_RAPID_CLIENT_SECRET,
      script: code,
      language: language.id,
      versionIndex: "0", // Adjust based on the language version needed
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_RAPID_URL,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const output = response.data;
      setOutputDetails(output);
      showSuccessToast("Compiled Successfully!");
    } catch (error) {
      const status = error.response?.status;
      if (status === 429) {
        showErrorToast("Quota of 100 requests exceeded for the Day!", 10000);
      } else {
        showErrorToast("Something went wrong. Try again!");
      }
    } finally {
      setProcessing(false);
    }
  };

  return { handleCompile, processing };
};

export default useCompile;
