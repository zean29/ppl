import React, { useState } from "react";
import { User, Bell, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import StatusTracker from "./dashboard/StatusTracker";
import DashboardCards from "./dashboard/DashboardCards";

interface NavbarProps {
  userRole?: "student" | "supervisor" | "admin";
  userName?: string;
  userAvatar?: string;
}

const Navbar = ({
  userRole = "student",
  userName = "John Doe",
  userAvatar = "",
}: NavbarProps) => {
  return (
    <div className="h-16 px-6 border-b border-gray-200 flex items-center justify-between bg-white">
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-primary">PPL Management</h1>
      </div>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-10 w-10 rounded-full">
              <Avatar>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback className="bg-primary text-white">
                  {userName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

interface SidebarProps {
  userRole?: "student" | "supervisor" | "admin";
}

const Sidebar = ({ userRole = "student" }: SidebarProps) => {
  const studentLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Registration", path: "/registration" },
    { name: "Placement", path: "/placement" },
    { name: "Progress", path: "/progress" },
    { name: "Certificate", path: "/certificate" },
  ];

  const supervisorLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Students", path: "/students" },
    { name: "Assessments", path: "/assessments" },
    { name: "Evaluations", path: "/evaluations" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/" },
    { name: "Registrations", path: "/registrations" },
    { name: "Placements", path: "/placements" },
    { name: "Supervisors", path: "/supervisors" },
    { name: "Certificates", path: "/certificates" },
    { name: "Reports", path: "/reports" },
  ];

  const links =
    userRole === "student"
      ? studentLinks
      : userRole === "supervisor"
        ? supervisorLinks
        : adminLinks;

  return (
    <div className="w-64 h-full bg-white border-r border-gray-200 p-4">
      <div className="space-y-1">
        {links.map((link, index) => (
          <Button
            key={index}
            variant={index === 0 ? "default" : "ghost"}
            className="w-full justify-start"
          >
            {link.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

interface HomeProps {
  userRole?: "student" | "supervisor" | "admin";
}

const Home = ({ userRole = "student" }: HomeProps) => {
  const [role, setRole] = useState<"student" | "supervisor" | "admin">(
    userRole,
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={role} />
      <div className="flex">
        <Sidebar userRole={role} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
              Welcome to PPL Management System
            </h1>
            <p className="text-gray-600">
              Track your progress, manage placements, and complete your teaching
              practice requirements all in one place.
            </p>

            <StatusTracker />

            <h2 className="text-xl font-semibold mt-8 mb-4">Quick Actions</h2>
            <DashboardCards userRole={role} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
