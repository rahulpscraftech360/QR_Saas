import { CalendarHeart, Home } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  if (!isMenuOpen) return null;
  return (
    <div className="flex flex-col bg-white p-5 shadow-lg w-full sm:w-full h-screen">
      <ul className="grid grid-flow-row">
        <Link to="/">
          <div className="flex space-x-2">
            <Home />
            <h1 className="hidden sm:block  sm:text-2xl">Home</h1>
          </div>
        </Link>
      </ul>
      <ul className="grid grid-flow-row">
        <Link to="/events">
          <div className="flex space-x-2">
            <CalendarHeart />
            <h1 className="hidden sm:block  sm:text-2xl">Events</h1>
          </div>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
