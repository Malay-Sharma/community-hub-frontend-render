// src/pages/NotFound.jsx
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-[#C4C4C4] p-8 text-center px-4">
      <h1 className="text-6xl font-bold ">404</h1>
      <p className="text-2xl mt-4 text-gray-400">Page Not Found</p>
      <p className="text-gray-400 mt-2">Sorry, the page you are looking for doesn't exist.</p>
      <Link
        to="/dashboard"
        className="mt-6 inline-block text-white rounded transition"
      >
        <Button className='hover:bg-transparent hover:text-[#C4C4C4] hover:shadow-[0_0_25px_5px_rgba(0,200,255,0.6)]'>
            Go to DashBoard
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
