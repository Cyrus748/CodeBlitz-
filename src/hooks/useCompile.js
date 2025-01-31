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
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      script: code,
      language: language.name,
      versionIndex: "0", // You can set this to the appropriate version index
    };

    try {
      // Making a POST request to compile code
      const response = await axios.post(
        import.meta.env.VITE_RAPID_URL,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
        }
      );

      setProcessing(false);
      setOutputDetails(response.data); // Set the final output details
      showSuccessToast("Compiled Successfully!");
    } catch (error) {
      const status = error.response?.status;
      console.log("status", status);

      if (status === 401) {
        showErrorToast("Unauthorized access. Please check your credentials.");
      } else if (status === 429) {
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
