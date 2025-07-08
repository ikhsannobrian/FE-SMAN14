import React, { memo } from "react";
import Logo from "../assets/logo.png";

const NavLogin = () => {
  return (
    <nav className="bg-white shadow px-4 sm:px-6 py-3 flex items-center justify-between">
      {/* Kiri: Logo dan Judul */}
      <div className="flex items-center">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo SMAN 14"
            className="h-10 sm:h-14 w-auto"
            width={56}
            height={56}
            loading="eager"
            decoding="async"
          />
          <div className="ml-2 sm:ml-4">
            <h1 className="font-semibold text-xs sm:text-sm leading-4 sm:leading-5">
              Sistem Informasi Manajemen
            </h1>
            <p className="text-gray-600 text-xs">SMAN 14 BEKASI</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default memo(NavLogin);
