import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";

type NavbarProps = {
  isLoggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navItems = isLoggedIn
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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020107]/80 px-4 py-3 border-b-2 border-b-primary">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="w-32" />
        </Link>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-shade-50 text-base">
          {navItems.map((item) =>
            item.path ? (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={item.action}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            )
          )}
        </div>

        {/* Mobile menu icon */}
        <button
          className="md:hidden text-shade-50 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon icon="gg:menu-right" className="size-11" />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-40 py-4" : "max-h-0 py-0"
        }`}
      >
        <div className="flex flex-col items-center gap-4 text-shade-50 text-base text-center">
          {navItems.map((item) =>
            item.path ? (
              <Link
                key={item.label}
                to={item.path}
                className="hover:text-primary transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <button
                key={item.label}
                onClick={() => {
                  item.action?.();
                  setMenuOpen(false);
                }}
                className="hover:text-primary transition-colors"
              >
                {item.label}
              </button>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
