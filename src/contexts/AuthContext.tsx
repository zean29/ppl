import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
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
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
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
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (username: string, password: string, role: UserRole) => {
    try {
      // In a real app, we would use Supabase auth or another auth provider
      // For now, we'll simulate authentication with our users table
      const { data, error } = await supabase
        .from("users")
        .select("id, username, role, full_name")
        .eq("username", username)
        .eq("password", password) // In a real app, we would compare hashed passwords
        .eq("role", role)
        .single();

      if (error || !data) {
        return { success: false, message: "Invalid credentials" };
      }

      const userData: User = {
        id: data.id,
        username: data.username,
        role: data.role as UserRole,
        fullName: data.full_name,
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
};
