import React from "react";
import { Icon } from "@iconify/react";

// Props
type ButtonProps = {
  variant?: "primary" | "destructive";
  children: React.ReactNode;
  icon?: string;
  iconClass?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  icon,
  iconClass = "text-shade-950 group-hover:text-shade-50 group-active:text-shade-50",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}) => {
  // Base style for all variants
  const baseStyles = `
    inline-flex w-fit items-center justify-center text-base font-bold px-4 py-2 
    rounded-lg gap-1 shadow group transition
    ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
  `;

  // Different styles based on button variant
  const variantStyles =
    variant === "primary"
      ? disabled
        ? "bg-primary text-shade-950" // no hover or active state if button is disabled
        : "bg-primary text-shade-950 shadow-[inset_0_0_10px_5px_#2B6BE3] " +
          "hover:bg-[#2B6BE3] hover:text-shade-50 hover:shadow-[inset_0_0_10px_5px_#124CB7] " +
          "active:bg-[#2B6BE3] active:text-shade-50 active:shadow-[inset_0_0_10px_5px_#124CB7]"
      : disabled
      ? "bg-shade-400 text-shade-950"
      : "bg-shade-400 text-shade-950 shadow-[inset_0_0_10px_5px_#4F4F4F] " +
        "hover:bg-[#C31010] hover:text-shade-50 hover:shadow-[inset_0_0_10px_5px_rgba(0,0,0,0.5)] " +
        "active:bg-[#C31010] active:text-shade-50 active:shadow-[inset_0_0_10px_5px_rgba(0,0,0,0.5)]";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
      {icon && <Icon icon={icon} className={iconClass} />}
    </button>
  );
};

export default Button;
