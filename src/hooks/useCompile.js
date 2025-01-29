import { useState } from "react";
import axios from "axios";
import { Buffer } from "buffer";

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
      language_id: language.id,
      source_code: Buffer.from(code).toString("base64"),
    };

    try {
      // Making a POST request for compiling code
      const response = await axios.post(
        import.meta.env.VITE_RAPID_URL,
        formData,
        {
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "content-type": "application/json",
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
        }
      );

      // console.log("response received from server", response.data);

      const token = response.data.token;
      await checkStatus(token); // Check the status of the compilation

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

  // Function to check the status of compilation
  const checkStatus = async (token) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_RAPID_URL}/${token}`,
        {
          params: { base64_encoded: "true", fields: "*" },
          headers: {
            "X-RapidAPI-Host": import.meta.env.VITE_RAPID_HOST,
            "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          },
        }
      );

      const statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        // Status 1 or 2 means the code is still processing, so poll again after 2 seconds
        setTimeout(() => checkStatus(token), 2000);
      } else {
        setProcessing(false);
        setOutputDetails(response.data); // Set the final output details
        // console.log(response.data)
        showSuccessToast("Compiled Successfully!");
      }
    } catch (err) {
      console.log("Error while checking status", err);

      showErrorToast("Something went wrong while checking status!");
      setProcessing(false);
    }
  };

  return { handleCompile, processing };
};

export default useCompile;
