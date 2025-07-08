import React, { useState, useRef, useEffect, memo } from "react";
import Logo from "../assets/logo.png";
import { Menu, User, LogOut } from "lucide-react";
import AlertLogout from "./AlertLogout";
import { useNavigate } from "react-router-dom";

const Nav = ({ isDashboard, onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/");
  };

  const handleLogoutClick = () => {
    setDropdownOpen(false);
    setShowLogoutAlert(true);
  };

  const handleCancelLogout = () => {
    setShowLogoutAlert(false);
  };

  return (
    <>
      <nav className="bg-white shadow px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Kiri: Logo dan Judul */}
        <div className="flex items-center">
          {isDashboard && (
            <button onClick={onToggleSidebar} className="mr-2 sm:mr-3">
              <Menu size={24} />
            </button>
          )}

          <div className="flex items-center">
            <img
              src={Logo}
              alt="Logo SMAN 14"
              loading="eager"
              decoding="async"
              width={isDashboard ? 40 : 56}
              height="auto"
              className={`w-auto ${
                isDashboard ? "h-8 sm:h-10" : "h-10 sm:h-14"
              }`}
            />
            <div className="ml-2 sm:ml-4">
              <h1 className="font-semibold text-xs sm:text-sm leading-4 sm:leading-5">
                Sistem Informasi Manajemen
              </h1>
              <p className="text-gray-600 text-xs">SMAN 14 BEKASI</p>
            </div>
          </div>
        </div>

        {/* Kanan */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center gap-1 sm:gap-2"
          >
            {!isDashboard && <User size={20} className="sm:size-5" />}
            {isDashboard && (
              <>
                <span className="text-xs sm:text-sm">Admin</span>
                <User size={18} className="sm:size-5" />
              </>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10">
              {!isDashboard && (
                <>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/layanan-konseling");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Layanan Konseling
                  </button>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/statuskonseling");
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Status Konseling
                  </button>
                </>
              )}
              <button
                onClick={handleLogoutClick}
                className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2 text-red-600"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Alert Logout */}
      {showLogoutAlert && (
        <AlertLogout onConfirm={handleLogout} onCancel={handleCancelLogout} />
      )}
    </>
  );
};

export default memo(Nav);
