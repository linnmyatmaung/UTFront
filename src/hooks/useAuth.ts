import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AdminLogin, AdminLoginRequest, CodeLogin, CodeLoginRequest } from "@/api/authApi";

export const useAuth = () => {
  const navigate = useNavigate();

  const [isCodeAuthenticated, setIsCodeAuthenticated] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  useEffect(() => {
    const codeToken = localStorage.getItem("code_jwt");
    const adminToken = localStorage.getItem("admin_jwt");
  
    setIsCodeAuthenticated(!!codeToken);
    setIsAdminAuthenticated(!!adminToken);
  
    setIsAuthLoading(false);
  }, []);

  const codelogin = async (code: CodeLoginRequest) => {
    try {
      const res = await CodeLogin(code);
      localStorage.setItem("code_jwt", res.data.token);
      setIsCodeAuthenticated(true);
      navigate("/");
    } catch (error) {
      console.error("Invalid PIN code", error);
      throw new Error("Invalid PIN code");
    }
  };

  const adminlogin = async (reqData : AdminLoginRequest) => {
    try {
      const res = await AdminLogin(reqData);
      localStorage.setItem("admin_jwt", res.data.token);
      setIsAdminAuthenticated(true);
    } catch (error) {
      console.error("Admin login failed:", error);
    }
  };

  const codelogout = () => {
    localStorage.removeItem("code_jwt");
    setIsCodeAuthenticated(false);
    navigate("/login/code");
  };

  const adminlogout = () => {
    localStorage.removeItem("admin_jwt");
    setIsAdminAuthenticated(false);
    navigate("/login/admin");
  };

  return {
    isCodeAuthenticated,
    isAdminAuthenticated,
    isAuthLoading,
    codelogin,
    adminlogin,
    codelogout,
    adminlogout,
  };
};
