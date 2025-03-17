import React from "react";
import ActionCard from "./ActionCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  UserCircle,
  BookOpen,
  Award,
  ClipboardCheck,
  Users,
  FileText,
  GraduationCap,
} from "lucide-react";

interface DashboardCardsProps {
  userRole?: "student" | "supervisor" | "admin";
}

const DashboardCards = ({ userRole = "student" }: DashboardCardsProps) => {
  const studentCards = [
    {
      title: "Registration",
      description:
        "Complete your personal details and upload required documents",
      status: "completed" as const,
      actionLabel: "View Details",
      icon: <UserCircle className="h-8 w-8" />,
    },
    {
      title: "Placement",
      description: "Select your preferred PPL location and supervisor",
      status: "in-progress" as const,
      actionLabel: "Continue",
      icon: <BookOpen className="h-8 w-8" />,
    },
    {
      title: "Progress Tracking",
      description: "Monitor your teaching practice progress and assessments",
      status: "not-started" as const,
      actionLabel: "View Progress",
      icon: <ClipboardCheck className="h-8 w-8" />,
    },
    {
      title: "Certificate",
      description: "Download your PPL completion certificate when available",
      status: "not-started" as const,
      actionLabel: "Check Status",
      icon: <Award className="h-8 w-8" />,
    },
  ];

  const supervisorCards = [
    {
      title: "Student List",
      description: "View and manage your assigned students",
      status: "in-progress" as const,
      actionLabel: "View Students",
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: "Assessments",
      description: "Complete evaluations for your assigned students",
      status: "not-started" as const,
      actionLabel: "Start Assessment",
      icon: <ClipboardCheck className="h-8 w-8" />,
    },
    {
      title: "Evaluations",
      description: "Review and submit final evaluations",
      status: "not-started" as const,
      actionLabel: "View Evaluations",
      icon: <FileText className="h-8 w-8" />,
    },
  ];

  const adminCards = [
    {
      title: "Registration Management",
      description: "Review and approve student registrations",
      status: "in-progress" as const,
      actionLabel: "View Registrations",
      icon: <UserCircle className="h-8 w-8" />,
    },
    {
      title: "Placement Management",
      description: "Manage PPL locations and supervisor assignments",
      status: "in-progress" as const,
      actionLabel: "Manage Placements",
      icon: <BookOpen className="h-8 w-8" />,
    },
    {
      title: "Certificate Management",
      description: "Generate and issue certificates for completed students",
      status: "not-started" as const,
      actionLabel: "Manage Certificates",
      icon: <GraduationCap className="h-8 w-8" />,
    },
  ];

  return (
    <div className="w-full bg-gray-50 p-6 rounded-lg">
      <Tabs defaultValue={userRole} className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="student">Student</TabsTrigger>
          <TabsTrigger value="supervisor">Supervisor</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>

        <TabsContent value="student" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {studentCards.map((card, index) => (
              <ActionCard
                key={`student-card-${index}`}
                title={card.title}
                description={card.description}
                status={card.status}
                actionLabel={card.actionLabel}
                icon={card.icon}
                onAction={() => console.log(`${card.title} action clicked`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="supervisor" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supervisorCards.map((card, index) => (
              <ActionCard
                key={`supervisor-card-${index}`}
                title={card.title}
                description={card.description}
                status={card.status}
                actionLabel={card.actionLabel}
                icon={card.icon}
                onAction={() => console.log(`${card.title} action clicked`)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="admin" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adminCards.map((card, index) => (
              <ActionCard
                key={`admin-card-${index}`}
                title={card.title}
                description={card.description}
                status={card.status}
                actionLabel={card.actionLabel}
                icon={card.icon}
                onAction={() => console.log(`${card.title} action clicked`)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardCards;
