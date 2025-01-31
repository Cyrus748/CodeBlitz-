import { toast } from "react-hot-toast";

export const useCompile = () => {
  const compileCode = async (code, language, input) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-rapidapi-host": import.meta.env.VITE_RAPID_HOST,
        "x-rapidapi-key": import.meta.env.VITE_RAPID_API_KEY,
      },
      body: JSON.stringify({
        script: code,
        language: language,
        stdin: input,
        clientId: import.meta.env.VITE_CLIENT_ID,
        clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_RAPID_URL, options);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to compile code");
      
      return data;
    } catch (error) {
      toast.error(error.message);
      return null;
    }
  };

  return { compileCode };
};

export { useCompile }; // Named export instead of default
