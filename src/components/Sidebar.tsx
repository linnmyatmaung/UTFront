// components/Sidebar.tsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const getLinkClasses = (path: string, exact: boolean = false) =>
    `block px-4 py-2 rounded hover:bg-violet-600 transition ${
      exact
        ? location.pathname === path
          ? "bg-violet-700"
          : ""
        : location.pathname.startsWith(path)
        ? "bg-violet-700"
        : ""
    }`;

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 p-4 transition-transform duration-300 ease-in-out z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <button
        onClick={onClose}
        className="mb-4 text-2xl"
        aria-label="Close sidebar"
      >
        &#x2715; UTYCC-WELCOME
      </button>

      <nav className="space-y-2">
        <Link
          to="/admin"
          onClick={onClose}
          className={getLinkClasses("/admin", true)}
        >
          Dashboard
        </Link>
        <Link
          to="/admin/selection"
          onClick={onClose}
          className={getLinkClasses("/admin/selection")}
        >
          Selection
        </Link>
        <Link
          to="/admin/agenda"
          onClick={onClose}
          className={getLinkClasses("/admin/agenda")}
        >
          Agenda
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
