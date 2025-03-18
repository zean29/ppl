import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import StatusTracker from "../dashboard/StatusTracker";
import DashboardCards from "../dashboard/DashboardCards";
import CertificateDownload from "./CertificateDownload";
import PlacementSelection from "./PlacementSelection";
import RegistrationForm from "./RegistrationForm";

interface StudentDashboardProps {
  view?: "overview" | "registration" | "placement" | "certificate" | "progress";
}

const StudentDashboard = ({ view = "overview" }: StudentDashboardProps) => {
  const { user } = useAuth();
  const role = "student";
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Role-specific welcome messages
  const getWelcomeMessage = () => {
    return "Track your progress, manage placements, and complete your teaching practice requirements all in one place.";
  };

  const renderContent = () => {
    switch (view) {
      case "registration":
        return <RegistrationForm />;
      case "placement":
        return (
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">
              Placement Information
            </h2>
            <p className="text-gray-600 mb-4">
              Placement assignments are managed by the administration. You
              cannot select your own PPL location.
            </p>
            <p className="text-gray-600 mb-4">
              Please check back here after your registration has been approved
              to see your assigned placement details.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="text-md font-medium text-blue-800 mb-2">Note:</h3>
              <p className="text-blue-700">
                If you have specific concerns about your placement, please
                contact the PPL administration office directly.
              </p>
            </div>
          </div>
        );
      case "certificate":
        return <CertificateDownload status="available" />;
      case "progress":
        return <StatusTracker />;
      case "overview":
      default:
        return (
          <>
            <StatusTracker />
            <DashboardCards userRole={role} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole={role} userName={user?.fullName || user?.username} />
      <div className="flex">
        <Sidebar
          userRole={role}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {view === "overview" && (
              <>
                <h1 className="text-2xl font-bold">
                  Welcome to PPL Management System
                  {user?.fullName ? `, ${user.fullName}` : ""}
                </h1>
                <p className="text-gray-600">{getWelcomeMessage()}</p>
              </>
            )}

            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
