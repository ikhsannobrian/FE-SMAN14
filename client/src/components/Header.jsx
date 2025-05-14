import React from "react";

const Header = () => {
  return (
    <header className="bg-info py-2 text-white-content rounded">
      <div className="mx-auto max-w-6xl px-4 sm:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end gap-y-1 sm:gap-x-6 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-white">
            Mon-Fri 08.00-16.00 WIB
          </p>
          <p className="hidden sm:inline text-white">|</p>
          <p className="text-xs sm:text-sm text-white">
            bksman14bekasi@gmail.com
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
