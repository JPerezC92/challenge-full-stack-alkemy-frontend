import React from "react";

const Test = () => {
  React.useEffect(() => {
    console.log("Test");
  }, []);

  return <div>Test</div>;
};

export default Test;
