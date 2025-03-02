import React from "react";

const Loader = () => {
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center">
        <img className="h-16" src="./infinite-spinner.svg" alt="Loading" />
      </div>
    </div>
  );
};

export default Loader;
