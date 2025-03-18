import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import DashboardCards from "../dashboard/DashboardCards";
import StudentList from "./StudentList";
import AssessmentForm from "./AssessmentForm";

interface SupervisorDashboardProps {
  view?: "overview" | "students" | "assessment" | "evaluations";
  studentId?: string;
}

const SupervisorDashboard = ({
  view = "overview",
  studentId,
}: SupervisorDashboardProps) => {
  const { user } = useAuth();
  const role = "supervisor";
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  // Role-specific welcome messages
  const getWelcomeMessage = () => {
    return "Manage your assigned students, complete assessments, and submit evaluations for teaching practice.";
  };

  const renderContent = () => {
    switch (view) {
      case "students":
        return <StudentList />;
      case "assessment":
        return <AssessmentForm studentId={studentId} />;
      case "evaluations":
        return (
          <div className="p-4 bg-white rounded-lg shadow">
            Evaluations content will be displayed here
          </div>
        );
      case "overview":
      default:
        return <DashboardCards userRole={role} />;
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

export default SupervisorDashboard;
