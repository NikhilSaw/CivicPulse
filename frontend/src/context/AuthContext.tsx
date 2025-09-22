import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as apiClient from "@/utils/apiClient";

interface User { 
  role: "admin" | "user"; 
  email: string; 
  name?: string; 
}

interface AuthContextType {
  user: User | null;
  token?: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<void>;
  requestOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: any}> = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(() => {
    try { 
      return JSON.parse(localStorage.getItem("mock_user") || "null"); 
    } catch { 
      return null; 
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("mock_token"));

  useEffect(() => {
    if (user) localStorage.setItem("mock_user", JSON.stringify(user)); 
    else localStorage.removeItem("mock_user");
    if (token) localStorage.setItem("mock_token", token); 
    else localStorage.removeItem("mock_token");
  }, [user, token]);

  const login = async (email: string, password: string) => {
    // TODO: Replace with POST /api/v1/auth/login (Java backend). For now use mock apiClient.loginApi
    const resp = await apiClient.loginApi(email, password);
    // resp should be { token, role, user? }
    setToken(resp.token);
    setUser({ role: resp.role, email });
    
    // Navigate based on role
    if (resp.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/dashboard");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    // TODO: Replace with POST /api/v1/auth/register
    await apiClient.registerApi(name, email, password);
    // After register, redirect to OTP verification page
    navigate("/verify-otp", { state: { email } });
  };

  const requestOtp = async (email: string) => {
    // TODO: Replace with POST /api/v1/auth/send-otp
    await apiClient.sendOtpApi(email);
  };

  const verifyOtp = async (email: string, otp: string) => {
    // TODO: Replace with POST /api/v1/auth/verify-otp
    const resp = await apiClient.verifyOtpApi(email, otp);
    setToken(resp.token);
    setUser({ role: resp.role, email });
    // After verify, navigate to user dashboard (default)
    if (resp.role === "admin") navigate("/admin/dashboard"); 
    else navigate("/user/dashboard");
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("mock_user");
    localStorage.removeItem("mock_token");
    navigate("/");
    // TODO: Optionally call backend to invalidate tokens
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, requestOtp, verifyOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}