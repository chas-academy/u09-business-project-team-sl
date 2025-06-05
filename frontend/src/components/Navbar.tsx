import React, { useState } from "react";
import { Icon } from "@iconify/react";

type NavbarProps = {
  isLoggedIn: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = isLoggedIn
    ? ["Home", "My lists", "Log out"]
    : ["Home", "Sign in"];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#020107]/80 px-4 py-3 border-b-2 border-b-primary">
      <div className="flex items-center justify-between h-full">
        {/* Logo */}
        <a href="/">
          <img src="/logo.svg" alt="Logo" className="w-32" />
        </a>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-shade-50 text-base">
          {navItems.map((item) => (
            <button
              key={item}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
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
          {navItems.map((item) => (
            <button
              key={item}
              className="hover:text-primary transition-colors cursor-pointer"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
