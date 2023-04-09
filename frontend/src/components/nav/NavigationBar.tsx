import React from "react";

export const NavigationBar = () => {
  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-main-600">
      <div className="w-auto lg:order-2 lg:w-1/5 lg:text-center">
        <a
          className="text-xl font-semibold text-gray-100 font-heading"
          href="#"
        >
          AI Chef
        </a>
      </div>
    </nav>
  );
};

