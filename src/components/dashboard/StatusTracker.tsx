import React from "react";
import { Check, Clock, FileText, MapPin, School } from "lucide-react";
import { cn } from "@/lib/utils";

type StepStatus = "completed" | "current" | "upcoming";

interface Step {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: StepStatus;
}

interface StatusTrackerProps {
  steps?: Step[];
  currentStep?: number;
}

const StatusTracker = ({
  steps = [
    {
      id: 1,
      name: "Registration",
      description: "Complete personal details and upload documents",
      icon: <FileText className="h-6 w-6" />,
      status: "completed" as StepStatus,
    },
    {
      id: 2,
      name: "Placement",
      description: "Select PPL location and supervisor",
      icon: <MapPin className="h-6 w-6" />,
      status: "current" as StepStatus,
    },
    {
      id: 3,
      name: "In Progress",
      description: "Teaching practice ongoing",
      icon: <Clock className="h-6 w-6" />,
      status: "upcoming" as StepStatus,
    },
    {
      id: 4,
      name: "Assessment",
      description: "Supervisor evaluation and grading",
      icon: <School className="h-6 w-6" />,
      status: "upcoming" as StepStatus,
    },
    {
      id: 5,
      name: "Certification",
      description: "Certificate generation and download",
      icon: <Check className="h-6 w-6" />,
      status: "upcoming" as StepStatus,
    },
  ],
  currentStep = 2,
}: StatusTrackerProps) => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-4">PPL Progress Tracker</h2>

      <div className="flex items-center justify-between w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center text-center">
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                  step.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : step.status === "current"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-400",
                )}
              >
                {step.icon}
              </div>
              <span
                className={cn(
                  "font-medium",
                  step.status === "completed"
                    ? "text-green-600"
                    : step.status === "current"
                      ? "text-blue-600"
                      : "text-gray-400",
                )}
              >
                {step.name}
              </span>
              <span className="text-xs text-gray-500 mt-1 max-w-[120px]">
                {step.description}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-1 flex-1 mx-2",
                  index < currentStep - 1 ? "bg-green-400" : "bg-gray-200",
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StatusTracker;
