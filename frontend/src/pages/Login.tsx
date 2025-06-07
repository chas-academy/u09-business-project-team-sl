import { useState } from "react";
import GoogleLogin from "../components/GoogleLogin";

const LoginPage = () => {
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLoginSuccess = async (idToken: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/google-login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken }),
        }
      );

      const text = await response.text();

      if (!text) {
        throw new Error("Empty response from server");
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("Failed to parse JSON from server:", text);
        throw new Error("Invalid response format from server");
      }

      if (!response.ok) {
        throw new Error(data.message || "Google login failed");
      }

      console.log("Login success, received token:", data.token);
      localStorage.setItem("token", data.token);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  const handleGoogleLoginFailure = (error: any) => {
    setError("Google login failed: " + JSON.stringify(error));
  };

  return (
    <div>
      <GoogleLogin
        onLoginSuccess={handleGoogleLoginSuccess}
        onLoginFailure={handleGoogleLoginFailure}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default LoginPage;
