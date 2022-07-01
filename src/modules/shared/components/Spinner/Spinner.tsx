import React from "react";
import { ImSpinner9 } from "react-icons/im";

type SpinnerProps = {
  className?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ className }) => {
  return (
    <span
      role="alert"
      aria-busy="true"
      className={`flex justify-center ${className}`}
    >
      <ImSpinner9 className="animate-spin" />
    </span>
  );
};
