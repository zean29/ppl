import React from "react";
import StatusTracker from "./dashboard/StatusTracker";
import DashboardCards from "./dashboard/DashboardCards";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "./layout/Navbar";
import Sidebar from "./layout/Sidebar";

interface HomeProps {
  userRole?: "student" | "supervisor" | "admin";
}

const Home = ({ userRole = "student" }: HomeProps) => {
  const { user } = useAuth();
  const role = user?.role || userRole;

  // Role-specific welcome messages
  const getWelcomeMessage = () => {
    switch (role) {
      case "student":
        return "Track your progress, manage placements, and complete your teaching practice requirements all in one place.";
      case "supervisor":
        return "Manage your assigned students, complete assessments, and submit evaluations for teaching practice.";
      case "admin":
        return "Oversee all PPL activities, manage registrations, placements, and generate reports.";
      default:
        return "Track your progress, manage placements, and complete your teaching practice requirements all in one place.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={role} userName={user?.fullName || user?.username} />
      <div className="flex">
        <Sidebar userRole={role} />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">
              Welcome to PPL Management System
              {user?.fullName ? `, ${user.fullName}` : ""}
            </h1>
            <p className="text-gray-600">{getWelcomeMessage()}</p>

            {role === "student" && <StatusTracker />}

            <DashboardCards userRole={role} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
