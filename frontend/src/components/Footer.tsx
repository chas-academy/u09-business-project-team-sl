import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Footer: React.FC = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const footerItems = isLoggedIn
    ? [
        { label: "Games", path: "/" },
        { label: "My lists", path: "/lists" },
        { label: "Log out", action: handleLogout },
      ]
    : [
        { label: "Games", path: "/" },
        { label: "Sign in", path: "/login" },
        { label: "Register", path: "/register" },
      ];

  return (
    <footer className="w-full bg-shade-900 border-t border-t-primary p-4 flex flex-col items-center gap-4 text-base text-shade-50">
      <div className="flex gap-6 flex-wrap justify-center">
        {footerItems.map((item) =>
          item.path ? (
            <Link
              key={item.label}
              to={item.path}
              className="hover:text-primary cursor-pointer transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <button
              key={item.label}
              onClick={item.action}
              className="hover:text-primary cursor-pointer transition-colors"
            >
              {item.label}
            </button>
          )
        )}
      </div>
      <a
        href="https://rawg.io/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-shade-200 hover:underline cursor-pointer text-xs"
      >
        Powered by RAWG
      </a>
    </footer>
  );
};

export default Footer;
