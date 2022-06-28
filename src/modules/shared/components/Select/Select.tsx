import React from "react";

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
>;

export const Select: React.FC<SelectProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <select
      {...props}
      className={`w-full rounded border p-1 transition ease-in-out focus:outline-teal-700/50 ${className}`}
    >
      {children}
    </select>
  );
};
