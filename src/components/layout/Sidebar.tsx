import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Home,
  ClipboardList,
  MapPin,
  FileCheck,
  Award,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

type UserRole = "student" | "supervisor" | "admin";

interface SidebarProps {
  userRole?: UserRole;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({
  userRole = "student",
  collapsed = false,
  onToggleCollapse = () => {},
}: SidebarProps) => {
  const [activeItem, setActiveItem] = useState("dashboard");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const studentNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      path: "/student",
    },
    {
      id: "registration",
      label: "Registration",
      icon: <ClipboardList size={20} />,
      path: "/student/registration",
    },
    {
      id: "placement",
      label: "View Placement",
      icon: <MapPin size={20} />,
      path: "/student/placement",
    },
    {
      id: "progress",
      label: "Progress",
      icon: <FileCheck size={20} />,
      path: "/student/progress",
    },
    {
      id: "certificate",
      label: "Certificate",
      icon: <Award size={20} />,
      path: "/student/certificate",
    },
  ];

  const supervisorNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      path: "/supervisor",
    },
    {
      id: "students",
      label: "Students",
      icon: <Users size={20} />,
      path: "/supervisor/students",
    },
    {
      id: "assessments",
      label: "Assessments",
      icon: <BookOpen size={20} />,
      path: "/supervisor/assessment",
    },
    {
      id: "evaluations",
      label: "Evaluations",
      icon: <FileCheck size={20} />,
      path: "/supervisor/evaluations",
    },
  ];

  const adminNavItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      path: "/",
    },
    {
      id: "registrations",
      label: "Registrations",
      icon: <ClipboardList size={20} />,
      path: "/registrations",
    },
    {
      id: "placements",
      label: "Placements",
      icon: <MapPin size={20} />,
      path: "/placements",
    },
    {
      id: "supervisors",
      label: "Supervisors",
      icon: <Users size={20} />,
      path: "/supervisors",
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: <Award size={20} />,
      path: "/certificates",
    },
    {
      id: "settings",
      label: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  const navItemsMap = {
    student: studentNavItems,
    supervisor: supervisorNavItems,
    admin: adminNavItems,
  };

  const navItems = navItemsMap[userRole];

  const handleNavItemClick = (id: string, path: string) => {
    setActiveItem(id);
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div
      className={cn(
        "flex flex-col h-full bg-background border-r transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">PPL Manager</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleCollapse}
          className={cn("ml-auto", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <Separator />

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-2 px-2">
          <TooltipProvider delayDuration={0}>
            {navItems.map((item) => (
              <Tooltip key={item.id} delayDuration={collapsed ? 0 : 999999}>
                <TooltipTrigger asChild>
                  <Button
                    variant={activeItem === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      collapsed ? "px-2" : "px-3",
                    )}
                    onClick={() => handleNavItemClick(item.id, item.path)}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">{item.label}</TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </nav>
      </ScrollArea>

      <Separator />

      <div className="p-4 space-y-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip delayDuration={collapsed ? 0 : 999999}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3",
                )}
              >
                <HelpCircle size={20} className="mr-2" />
                {!collapsed && <span>Help & Support</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">Help & Support</TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider delayDuration={0}>
          <Tooltip delayDuration={collapsed ? 0 : 999999}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start",
                  collapsed ? "px-2" : "px-3",
                )}
                onClick={handleLogout}
              >
                <LogOut size={20} className="mr-2" />
                {!collapsed && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && <TooltipContent side="right">Logout</TooltipContent>}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default Sidebar;
