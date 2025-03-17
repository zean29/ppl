import React from "react";
import { useNavigate } from "react-router-dom";
import {
  UserCircle,
  BookOpen,
  Award,
  ClipboardCheck,
  Users,
  FileText,
  GraduationCap,
  Building,
  BarChart,
  Calendar,
} from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "completed";
  actionLabel: string;
  icon: React.ReactNode;
  onAction: () => void;
}

const ActionCard = ({
  title,
  description,
  status,
  actionLabel,
  icon,
  onAction,
}: ActionCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "not-started":
        return "bg-gray-200 text-gray-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "not-started":
        return "Not Started";
      case "in-progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Not Started";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-primary">{icon}</div>
            <h3 className="font-semibold text-lg">{title}</h3>
          </div>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}
          >
            {getStatusText()}
          </span>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <button
          onClick={onAction}
          className={`w-full py-2 px-4 rounded-md ${status === "completed" ? "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50" : "bg-primary text-white hover:bg-primary/90"}`}
        >
          {actionLabel}
        </button>
      </div>
    </div>
  );
};

interface DashboardCardsProps {
  userRole?: "student" | "supervisor" | "admin";
}

const DashboardCards = ({ userRole = "student" }: DashboardCardsProps) => {
  const navigate = useNavigate();

  const studentCards = [
    {
      title: "Registration",
      description:
        "Complete your personal details and upload required documents",
      status: "completed" as const,
      actionLabel: "View Details",
      icon: <UserCircle className="h-8 w-8" />,
      path: "/registration",
    },
    {
      title: "Placement",
      description: "Select your preferred PPL location and supervisor",
      status: "in-progress" as const,
      actionLabel: "Continue",
      icon: <BookOpen className="h-8 w-8" />,
      path: "/placement",
    },
    {
      title: "Progress Tracking",
      description: "Monitor your teaching practice progress and assessments",
      status: "not-started" as const,
      actionLabel: "View Progress",
      icon: <ClipboardCheck className="h-8 w-8" />,
      path: "/progress",
    },
    {
      title: "Certificate",
      description: "Download your PPL completion certificate when available",
      status: "not-started" as const,
      actionLabel: "Check Status",
      icon: <Award className="h-8 w-8" />,
      path: "/certificate",
    },
  ];

  const supervisorCards = [
    {
      title: "Student List",
      description: "View and manage your assigned students",
      status: "in-progress" as const,
      actionLabel: "View Students",
      icon: <Users className="h-8 w-8" />,
      path: "/students",
    },
    {
      title: "Assessments",
      description: "Complete evaluations for your assigned students",
      status: "not-started" as const,
      actionLabel: "Start Assessment",
      icon: <ClipboardCheck className="h-8 w-8" />,
      path: "/assessments",
    },
    {
      title: "Evaluations",
      description: "Review and submit final evaluations",
      status: "not-started" as const,
      actionLabel: "View Evaluations",
      icon: <FileText className="h-8 w-8" />,
      path: "/evaluations",
    },
    {
      title: "Schedule",
      description: "Manage your supervision schedule and appointments",
      status: "not-started" as const,
      actionLabel: "View Schedule",
      icon: <Calendar className="h-8 w-8" />,
      path: "/schedule",
    },
  ];

  const adminCards = [
    {
      title: "Registration Management",
      description: "Review and approve student registrations",
      status: "in-progress" as const,
      actionLabel: "View Registrations",
      icon: <UserCircle className="h-8 w-8" />,
      path: "/registrations",
    },
    {
      title: "Placement Management",
      description: "Manage PPL locations and supervisor assignments",
      status: "in-progress" as const,
      actionLabel: "Manage Placements",
      icon: <BookOpen className="h-8 w-8" />,
      path: "/placements",
    },
    {
      title: "Supervisor Management",
      description: "Manage supervisors and their assignments",
      status: "in-progress" as const,
      actionLabel: "Manage Supervisors",
      icon: <Users className="h-8 w-8" />,
      path: "/supervisors",
    },
    {
      title: "Location Management",
      description: "Manage PPL locations and their capacity",
      status: "in-progress" as const,
      actionLabel: "Manage Locations",
      icon: <Building className="h-8 w-8" />,
      path: "/locations",
    },
    {
      title: "Certificate Management",
      description: "Generate and issue certificates for completed students",
      status: "not-started" as const,
      actionLabel: "Manage Certificates",
      icon: <GraduationCap className="h-8 w-8" />,
      path: "/certificates",
    },
    {
      title: "Reports",
      description: "Generate and view reports on PPL activities",
      status: "not-started" as const,
      actionLabel: "View Reports",
      icon: <BarChart className="h-8 w-8" />,
      path: "/reports",
    },
  ];

  // Display only the cards for the current user role
  const renderCards = () => {
    switch (userRole) {
      case "student":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {studentCards.map((card, index) => (
              <ActionCard
                key={`student-card-${index}`}
                title={card.title}
                description={card.description}
                status={card.status}
                actionLabel={card.actionLabel}
                icon={card.icon}
                onAction={() => navigate(card.path)}
              />
            ))}
          </div>
        );
      case "supervisor":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {supervisorCards.map((card, index) => (
              <ActionCard
                key={`supervisor-card-${index}`}
                title={card.title}
                description={card.description}
                status={card.status}
                actionLabel={card.actionLabel}
                icon={card.icon}
                onAction={() => navigate(card.path)}
              />
            ))}
          </div>
        );
      case "admin":
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminCards.map((card, index) => (
              <ActionCard
                key={`admin-card-${index}`}
                title={card.title}
                description={card.description}
                status={card.status}
                actionLabel={card.actionLabel}
                icon={card.icon}
                onAction={() => navigate(card.path)}
              />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        {userRole === "student"
          ? "Student Dashboard"
          : userRole === "supervisor"
            ? "Supervisor Dashboard"
            : "Admin Dashboard"}
      </h2>
      {renderCards()}
    </div>
  );
};

export default DashboardCards;
