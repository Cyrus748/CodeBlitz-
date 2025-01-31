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

  // Function to handle compilation
  const handleCompile = async () => {
    setProcessing(true);

    const formData = {
      clientId: import.meta.env.VITE_RAPID_HOST, // JDoodle clientId
      clientSecret: import.meta.env.VITE_RAPID_API_KEY, // JDoodle clientSecret
      script: code,
      language: language.id, // Ensure this matches JDoodle's language codes
      versionIndex: language.versionIndex || "0", // Default to version index 0 if not provided
    };

    try {
      // Making a POST request to compile code
      const response = await axios.post(
        import.meta.env.VITE_RAPID_URL,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      setProcessing(false);
      setOutputDetails(data); // Set the output details
      showSuccessToast("Compiled Successfully!");
    } catch (error) {
      const status = error.response?.status;
      console.log("status", status);

      if (status === 429) {
        showErrorToast("Quota of 100 requests exceeded for the Day!", 10000);
      } else {
        showErrorToast("Something went wrong. Try again!");
      }

      setProcessing(false);
    }
  };

  return { handleCompile, processing };
};

export default useCompile;
