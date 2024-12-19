import React, { useState } from "react";
import { Link } from "react-router-dom"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="p-4 text-lg font-bold border-b border-gray-700">
          My App
        </div>
        <ul className="mt-4 space-y-4">
            <Link to="/home" className="block px-4 py-2 hover:bg-gray-700">Create</Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-700">Home</Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-700">About</Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-700">Services</Link>
            <Link href="#" className="block px-4 py-2 hover:bg-gray-700">Contact</Link>
        </ul>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Header with Toggle Button */}
      <header className="bg-white shadow-sm p-4 flex items-center">
        <button onClick={toggleSidebar} className="text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <h1 className="ml-4 text-xl font-semibold">Animated Sidebar</h1>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sit amet accumsan
          tortor. Mauris vitae quam augue. Integer vel nisi ligula.
        </p>
      </main>
    </div>
  );
};

export default Sidebar;