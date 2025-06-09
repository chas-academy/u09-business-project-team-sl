import React from "react";
import { Icon } from "@iconify/react";

// Props
type InputFieldProps = {
  variant?: "input" | "textarea";
  title: string;
  placeholder: string;
  icon?: string;
  iconClass?: string;
  value?: string;
  name?: string;
  type?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onIconClick?: () => void;
};

const InputField: React.FC<InputFieldProps> = ({
  variant = "input",
  title,
  placeholder,
  icon,
  iconClass = "text-shade-200 group-hover:text-shade-50",
  value = "",
  name,
  type = "text",
  onChange,
  onIconClick,
}) => {
  // Base style for input and textarea
  const baseStyles =
    "bg-shade-600 p-2 rounded-lg shadow-[0_4px_4px_0_rgba(0,0,0,0.42)] placeholder-shown:text-shade-200 focus:outline-none border border-transparent transition-colors duration-300";

  // Adjust text color based on if there is a value
  const textColorClass = value ? "text-shade-50" : "text-shade-200";

  // Resize textarea height based on content
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  };

  React.useEffect(() => {
    if (variant === "textarea") {
      adjustHeight();
    }
  }, [value, variant]);

  return (
    <div className="flex flex-col gap-2 min-w-18 w-full">
      <label className="text-base font-bold text-shade-50">{title}</label>
      <div className="relative w-full">
        {variant === "input" ? (
          <input
            name={name}
            type={type}
            className={`${baseStyles} w-full ${
              icon ? "pr-10" : ""
            } text-base ${textColorClass} bg-shade-600 border-none`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        ) : (
          <textarea
            name={name}
            ref={textareaRef}
            className={`${baseStyles} w-full ${
              icon ? "pr-10" : ""
            } resize-none text-base ${textColorClass} bg-shade-600 border-none`}
            placeholder={placeholder}
            value={value}
            onChange={(e) => {
              if (onChange) onChange(e);
              adjustHeight();
            }}
            rows={3}
          />
        )}

        {/* Optional icon inside the input field */}
        {icon && (
          <Icon
            icon={icon}
            onClick={onIconClick}
            className={`absolute right-3 top-1/2 -translate-y-1/2 ${
              onIconClick
                ? "cursor-pointer pointer-events-auto"
                : "pointer-events-none"
            } ${iconClass}`}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;
