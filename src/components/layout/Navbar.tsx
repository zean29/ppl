import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronDown, LogOut, Settings, User } from "lucide-react";

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
  const roleBasedLinks = {
    student: [
      { name: "Dashboard", path: "/" },
      { name: "Registration", path: "/registration" },
      { name: "Placement", path: "/placement" },
      { name: "Progress", path: "/progress" },
    ],
    supervisor: [
      { name: "Dashboard", path: "/" },
      { name: "Students", path: "/students" },
      { name: "Assessments", path: "/assessments" },
    ],
    admin: [
      { name: "Dashboard", path: "/" },
      { name: "Registrations", path: "/registrations" },
      { name: "Placements", path: "/placements" },
      { name: "Certificates", path: "/certificates" },
      { name: "Reports", path: "/reports" },
    ],
  };

  const links = roleBasedLinks[userRole] || [];

  return (
    <nav className="w-full h-16 bg-white border-b border-gray-200 shadow-sm fixed top-0 left-0 z-50">
      <div className="container mx-auto h-full flex items-center justify-between px-4">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">PPL Management</span>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                link.path === "/" ? "text-primary" : "text-gray-600",
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" className="hidden md:flex">
            <span className="capitalize">{userRole}</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar>
                  <AvatarImage src={userAvatar} alt={userName} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {userName
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuLabel className="text-xs text-gray-500 capitalize">
                {userRole}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
