import React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  primary,
  secondary,
  tertiary,
  ...props
}) => {
  const background = primary
    ? "bg-teal-400/50 hover:bg-teal-400"
    : secondary
    ? "bg-orange-500/50 hover:bg-orange-500"
    : tertiary
    ? "bg-cyan-400/50 hover:bg-cyan-400"
    : "none";

  return (
    <button
      className={`rounded p-2 font-medium transition-all ease-in-out hover:shadow-md ${background} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
