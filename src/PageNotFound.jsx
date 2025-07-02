import React from "react";
import { Link } from "react-router-dom";
import pagenotfound from "./assets/error.png";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 text-center">
      <img
        src={pagenotfound}
        alt="Page Not Found"
        className="max-w-full w-[500px] md:w-[700px] lg:w-[800px] h-auto"
      />
      <h1 className="text-3xl md:text-4xl font-bold mt-6 text-gray-800">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mt-2 mb-6 text-lg">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition duration-300"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
