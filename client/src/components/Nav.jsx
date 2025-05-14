import React, { useState, useRef, useEffect } from "react";
import Logo from "../assets/logo.png";
import { Menu, User, LogOut } from "lucide-react";
import AlertLogout from "./AlertLogout";
import { useNavigate } from "react-router-dom";

const Nav = ({ isDashboard, onToggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showLogoutAlert, setShowLogoutAlert] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Tutup dropdown jika klik di luar area dropdown
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
    // Proses logout
    console.log("Logout successful");
    // Hapus token atau data session jika ada
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    // Redirect ke halaman login
    if (isDashboard) {
      navigate("/login-admin"); // Untuk admin
    } else {
      navigate("/login"); // Untuk layanan konseling
    }
  };

  const handleLogoutClick = () => {
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
          {/* Hanya tampilkan hamburger jika di dashboard */}
          {isDashboard && (
            <button onClick={onToggleSidebar} className="mr-2 sm:mr-3">
              <Menu size={24} />
            </button>
          )}

          <div className="flex items-center">
            <img
              src={Logo}
              alt="Logo SMAN 14"
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

        {/* Kanan: Dashboard = dropdown admin, Layanan = tombol logout */}
        {isDashboard ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="flex items-center gap-1 sm:gap-2"
            >
              <span className="text-xs sm:text-sm">Admin</span>
              <User size={18} className="sm:size-5" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                <button
                  onClick={handleLogoutClick}
                  className="w-full text-left px-3 py-2 text-xs sm:text-sm hover:bg-gray-100 flex items-center gap-1"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleLogoutClick}
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm"
          >
            <LogOut size={18} className="sm:size-5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        )}
      </nav>

      {/* Alert Logout */}
      {showLogoutAlert && (
        <AlertLogout onConfirm={handleLogout} onCancel={handleCancelLogout} />
      )}
    </>
  );
};

export default Nav;
