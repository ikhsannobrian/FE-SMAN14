import { useState } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import SidebarDashboard from "../components/SidebarDashboard";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Navbar */}
      <Nav isDashboard={true} onToggleSidebar={handleToggleSidebar} />

      {/* Layout: Sidebar & Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (hanya hidden lebarnya, bukan content-nya) */}
        <div
          className={`transition-all duration-300 bg-green-700 text-black h-full ${
            sidebarOpen ? "w-64" : "w-0"
          } overflow-hidden`}
        >
          <SidebarDashboard />
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-auto p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
