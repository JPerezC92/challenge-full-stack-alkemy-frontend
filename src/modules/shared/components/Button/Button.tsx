import React from "react";

type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  outline?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  primary,
  secondary,
  tertiary,
  outline,
  ...props
}) => {
  const background =
    primary && !outline
      ? "bg-teal-400/50 hover:bg-teal-400"
      : secondary && !outline
      ? "bg-orange-500/50 hover:bg-orange-500"
      : tertiary && !outline
      ? "bg-cyan-400/50 hover:bg-cyan-400"
      : "";

  const outlineColor =
    primary && outline
      ? "border-teal-400/50 hover:border-teal-400"
      : secondary && outline
      ? "border-orange-500/50 hover:border-orange-500"
      : tertiary && outline
      ? "border border-cyan-400/50 hover:border-cyan-400"
      : "";

  return (
    <button
      className={`rounded p-2 font-medium transition-all ease-in-out hover:shadow-md disabled:border-gray-400 disabled:opacity-75 ${background} ${outlineColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
