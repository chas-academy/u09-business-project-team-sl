import React, { useEffect } from "react";

declare global {
  interface Window {
    google?: any;
  }
}

interface GoogleLoginProps {
  onLoginSuccess: (token: string) => void;
  onLoginFailure: (error: any) => void;
}

const GoogleLogin: React.FC<GoogleLoginProps> = ({
  onLoginSuccess,
  onLoginFailure,
}) => {
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv")!,
        {
          theme: "outline",
          size: "medium",
          text: "signin_with",
          logo_alignment: "center",
          locale: "en",
        }
      );
    }
  }, []);

  const handleCredentialResponse = (response: any) => {
    console.log("Google credential response:", response);
    if (response.credential) {
      onLoginSuccess(response.credential);
    } else {
      onLoginFailure("No credential received");
    }
  };

  return <div id="googleSignInDiv"></div>;
};

export default GoogleLogin;
