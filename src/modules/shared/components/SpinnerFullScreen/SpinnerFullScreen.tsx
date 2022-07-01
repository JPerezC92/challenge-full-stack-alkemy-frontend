import React from "react";
import { Spinner } from "src/modules/shared/components/Spinner";

type SpinnerFullScreenProps = {
  children?: React.ReactNode;
  message?: React.ReactNode;
};

export const SpinnerFullScreen: React.FC<SpinnerFullScreenProps> = ({
  message,
}) => {
  return (
    <div className="flex  min-h-screen flex-col items-center justify-center gap-4 text-xl font-bold">
      {message}
      <Spinner className="text-4xl text-indigo-500" />
    </div>
  );
};
