import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { apiFetch } from "../api/api";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Make sure all fields are filled
    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords does not match");
      return;
    }

    try {
      const { confirmPassword, ...submitData } = formData;

      const res = await apiFetch("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Register failed");

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        throw new Error("No token recieved");
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-6 items-center justify-center">
      <h2 className="text-2xl font-bold text-shade-50 text-center">
        Register account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-shade-900 py-6 px-9 rounded-lg flex flex-col gap-6"
      >
        <InputField
          title="Username"
          placeholder="Your username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          icon="mdi:account"
        />

        <InputField
          title="E-mail"
          placeholder="Your e-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          icon="mdi:email"
        />

        <InputField
          title="Password"
          placeholder="Minimum 8 characters"
          name="password"
          value={formData.password}
          onChange={handleChange}
          type={showPassword ? "text" : "password"}
          icon={
            showPassword ? "clarity:eye-hide-solid" : "clarity:eye-show-solid"
          }
          iconClass="text-shade-200 hover:text-shade-50"
          onIconClick={() => setShowPassword(!showPassword)}
        />

        <InputField
          title="Confirm password"
          placeholder="Repeat password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          type={showConfirmPassword ? "text" : "password"}
          icon={
            showConfirmPassword
              ? "clarity:eye-hide-solid"
              : "clarity:eye-show-solid"
          }
          iconClass="text-shade-200 hover:text-shade-50"
          onIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
        />

        <div className="mx-auto flex flex-col gap-4 justify-center items-center">
          <Button type="submit" variant="primary">
            Register account
          </Button>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <p className="text-center text-shade-200 text-sm">
            Already have an account?{" "}
            <span
              className="underline cursor-pointer hover:text-shade-50"
              onClick={() => navigate("/login")}
            >
              Sign in
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
