import React from "react";
import { useAuthContext } from "@/context/AuthContext";

interface NavProps {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className = "" }) => {
  const { codelogout } = useAuthContext();

  return (
    <div
      className={`flex justify-between w-full items-center px-6 py-4 backdrop-blur-md bg-white/5 border border-white/10 shadow-lg rounded-xl ${className}`}
    >
      <a
        href="http://localhost:5173/agenda"
        className="hover:opacity-80 transition-opacity"
      >
        <svg
          width="140px"
          height="50px"
          viewBox="0 0 300 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="agendaGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#4f46e5" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <filter id="shadow" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow
                dx="1"
                dy="2"
                stdDeviation="2"
                floodColor="#000"
                floodOpacity="0.3"
              />
            </filter>
          </defs>

          <text
            x="0"
            y="40"
            fontFamily="'Poppins', sans-serif"
            fontSize="36"
            fontWeight="700"
            fill="url(#agendaGradient)"
            filter="url(#shadow)"
          >
            AGENDA
          </text>
        </svg>
      </a>

      <button
        className="flex items-center gap-2 px-6 py-2 font-poppins text-red-500 border-red-500 border-2 rounded-full hover:bg-red-500/10 transition-colors"
        onClick={codelogout}
      >
        <svg
          width="20px"
          height="20px"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 4V7L5 7V9H11V12H12L16 8L12 4L11 4Z" fill="#FF0000" />
          <path d="M0 1L3.41715e-07 15H8V13H2L2 3H8L8 1L0 1Z" fill="#FF0000" />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default Nav;
