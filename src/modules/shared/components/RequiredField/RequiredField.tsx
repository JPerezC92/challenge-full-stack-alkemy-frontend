import React from "react";

type RequiredFieldProps = {};

export const RequiredField: React.FC<RequiredFieldProps> = () => {
  return (
    <abbr title="required" className="text-xs text-red-400">
      *
    </abbr>
  );
};
