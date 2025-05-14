import React from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  FileText,
  FileSignature,
  ClipboardList,
  BadgeCheck,
  AlertCircle,
  UserPlus,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const SidebarDashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    {
      to: "/admin/dashboard",
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
    },
    { to: "/admin/tabeljk", icon: <Users size={20} />, label: "Konseling" },
    {
      to: "/admin/tabelta",
      icon: <GraduationCap size={20} />,
      label: "Tracer Alumni",
    },
    {
      to: "/admin/tabelna",
      icon: <FileText size={20} />,
      label: "Nilai Akademik",
    },
    {
      to: "/admin/formkesiswaan",
      icon: <FileSignature size={20} />,
      label: "Form Kesiswaan",
    },
    {
      to: "/admin/tabelsertifikat",
      icon: <BadgeCheck size={20} />,
      label: "Sertifikat",
    },
    {
      to: "/admin/tabelpelanggaran",
      icon: <AlertCircle size={20} />,
      label: "Pelanggaran Siswa",
    },
    {
      to: "/admin/createadmin",
      icon: <UserPlus size={20} />,
      label: "Create Account Admin",
    },
    {
      to: "/admin/userlist",
      icon: <ClipboardList size={20} />,
      label: "User List",
    },
  ];

  return (
    <aside className="w-64 min-w-[250px] bg-white shadow-md flex flex-col py-6 px-4 border-r h-screen overflow-y-auto">
      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li
            key={item.to}
            className={`flex items-center justify-between border-b pb-2 cursor-pointer rounded px-2 ${
              currentPath === item.to
                ? "bg-blue-100 font-semibold text-blue-700"
                : "hover:bg-gray-100"
            }`}
          >
            <Link to={item.to} className="w-full">
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarDashboard;
