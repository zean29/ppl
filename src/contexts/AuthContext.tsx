import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { supabase } from "@/lib/supabase";

type UserRole = "student" | "supervisor" | "admin";

interface User {
  id: string;
  username: string;
  role: UserRole;
  fullName: string | null;
  isLoggedIn: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (
    username: string,
    password: string,
    role: UserRole,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(() => {
    setLoading(true);
    try {
      // Check if user is stored in localStorage
      const storedUser = localStorage.getItem("pplUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser.isLoggedIn) {
          setUser(parsedUser);
        }
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (username: string, password: string, role: UserRole) => {
    try {
      // For demo purposes, we'll simulate a successful login
      // In a real app, you would validate against your database
      console.log("Login attempt with:", { username, password, role });

      // Simulate login delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Create a user object
      const userData: User = {
        id: "user-" + Math.random().toString(36).substring(2, 9),
        username,
        role,
        fullName: username, // For demo purposes
        isLoggedIn: true,
      };

      // Store user in localStorage
      localStorage.setItem("pplUser", JSON.stringify(userData));
      setUser(userData);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "An error occurred during login" };
    }
  };

  const logout = () => {
    localStorage.removeItem("pplUser");
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
