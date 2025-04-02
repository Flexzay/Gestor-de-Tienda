import { ButtonHTMLAttributes } from "react";
import { LucideIcon } from "lucide-react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  icon?: LucideIcon;
  text?: string;
}

export function Button({ variant = "primary", icon: Icon, text, ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-lg transition-colors duration-300 flex items-center justify-center shadow-sm";
  const variants = {
    primary: "bg-[#ff204e] text-white hover:bg-[#ff3b60]",
    secondary: "text-[#7B9400] hover:text-[#5c6f00]",
    icon: "text-gray-500 hover:text-[#05f2f2] p-2",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]}`} {...props}>
      {Icon && <Icon size={20} className={text ? "mr-2" : ""} />}
      {text && <span>{text}</span>}
    </button>
  );
}
