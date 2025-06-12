import React, { createContext, useContext, useMemo } from "react";
import { useAuth } from "../hooks/useAuth";
import { AdminLoginRequest, CodeLoginRequest } from "@/api/authApi";

interface AuthContextProps {
  isCodeAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  isAuthLoading: boolean;
  codelogin: (code: CodeLoginRequest) => Promise<void>;
  adminlogin: (data: AdminLoginRequest) => Promise<void>;
  codelogout: () => void;
  adminlogout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth(); // Use the useAuth hook to manage authentication

  const memoizedAuth = useMemo(() => auth, [auth]);

  return <AuthContext.Provider value={memoizedAuth}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
