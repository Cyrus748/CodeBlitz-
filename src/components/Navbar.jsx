import React from "react";

export default function Navbar() {
  return (
    <div className="navbar-container w-full h-16 flex items-center justify-between px-8 text-white shadow-xl bg-gradient-to-r from-blue-500 to-indigo-600 animate-gradientBackground">
      <div className="logo-container flex-shrink-0 flex items-center justify-center bg-white text-indigo-600 rounded-lg p-2 shadow-md">
        <img
          src="https://cdn-icons-png.flaticon.com/512/1828/1828231.png"
          alt="ico"
          className="w-9 h-9 p-1"
        />
        <h1 className="logo-text text-2xl font-bold font-mono tracking-tight">
        CodeBlitz ⚡
        </h1>
      </div>

      <div className="nav-links-container flex items-center space-x-8">
        <p className="nav-item text-center font-medium font-mono text-lg tracking-wide">
          Build, Compile & Test Your Code! <span title="100 Requests per day only">(Beta)</span>
        </p>
      </div>
    </div>
  );
}
