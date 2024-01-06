import { useRouteError } from "react-router-dom";

import React from "react";

const Error = () => {
  const err = useRouteError();
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center"
      //   style={{
      //     backgroundImage:
      //       "url('https://www.pngkey.com/png/detail/212-2123376_erreur-404-png-error-404.png')",
      //   }}
    >
      <h1 className="text-4xl font-bold mb-4">
        {" "}
        {err.status + " : " + err.statusText}
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default Error;
