import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import GoogleLogin from "../components/GoogleLogin";
import { apiFetch } from "../utils/api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  // local login (email + password)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!identifier.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    try {
      const res = await apiFetch("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      if (data.token) {
        login(data.token);
        navigate("/");
      } else {
        throw new Error("No token received");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Google login
  const handleGoogleLoginSuccess = async (idToken: string) => {
    try {
      const response = await apiFetch("/auth/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken }),
      });

      const text = await response.text();
      if (!text) throw new Error("Empty response from server");

      const data = JSON.parse(text);
      if (!response.ok) throw new Error(data.message || "Google login failed");

      login(data.token);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Unknown error");
    }
  };

  const handleGoogleLoginFailure = (error: any) => {
    setError("Google login failed: " + JSON.stringify(error));
  };

  return (
    <section className="md:min-h-screen flex flex-col gap-6 items-center justify-center pt-12 md:pt-0">
      <h2 className="text-2xl font-bold text-shade-50 text-center">Sign in</h2>

      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-shade-900 py-6 px-9 rounded-lg flex flex-col gap-6"
      >
        <InputField
          title="Username or E-mail"
          placeholder="Enter your username or e-mail"
          name="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          icon="mdi:account"
        />

        <InputField
          title="Password"
          placeholder="Enter your password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type={showPassword ? "text" : "password"}
          icon={
            showPassword ? "clarity:eye-hide-solid" : "clarity:eye-show-solid"
          }
          iconClass="text-shade-200 hover:text-shade-50"
          onIconClick={() => setShowPassword(!showPassword)}
        />

        <Button type="submit" variant="primary" className="w-full">
          Sign in
        </Button>

        <div className="w-full max-w-md">
          <GoogleLogin
            onLoginSuccess={handleGoogleLoginSuccess}
            onLoginFailure={handleGoogleLoginFailure}
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <p className="text-center text-shade-200 text-sm">
          Don’t have an account?{" "}
          <span
            className="underline cursor-pointer hover:text-shade-50"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
