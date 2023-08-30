import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-green-700 text-gray-100 rounded px-4 py-2 my-2 hover:bg-green-600"
    >
      {children}
    </button>
  );
};

export default Button;
