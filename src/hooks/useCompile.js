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
      clientId: import.meta.env.VITE_JDOODLE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_JDOODLE_CLIENT_SECRET,
      script: code,
      language: language.id, // Ensure this matches JDoodle's language codes
      versionIndex: language.versionIndex || "0", // Default to version index 0 if not specified
    };

    try {
      // Making a POST request to JDoodle's API for compiling code
      const response = await axios.post(
        import.meta.env.VITE_JDOODLE_URL,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { data } = response;

      if (data.error) {
        showErrorToast(`Error: ${data.error}`);
      } else {
        setOutputDetails(data);
        showSuccessToast("Compiled Successfully!");
      }
    } catch (error) {
      console.error("Error during code compilation:", error);
      showErrorToast("Something went wrong. Try again!");
    } finally {
      setProcessing(false);
    }
  };

  return { handleCompile, processing };
};

export default useCompile;
