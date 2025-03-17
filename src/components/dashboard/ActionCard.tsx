import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

interface ActionCardProps {
  title: string;
  description: string;
  status?: "completed" | "in-progress" | "not-started";
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

const ActionCard = ({
  title = "Card Title",
  description = "This is a description of the action that needs to be taken.",
  status = "not-started",
  actionLabel = "Start Now",
  onAction = () => console.log("Action clicked"),
  icon = null,
}: ActionCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full max-w-md h-full flex flex-col bg-white shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{title}</CardTitle>
            <CardDescription className="mt-2 text-gray-600">
              {description}
            </CardDescription>
          </div>
          {icon && <div className="text-primary">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {status === "completed" && (
          <div className="flex items-center text-green-600 mb-4">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span>Completed</span>
          </div>
        )}
        {status !== "completed" && (
          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}
          >
            {status === "in-progress" ? "In Progress" : "Not Started"}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={onAction}
          className="w-full justify-between"
          variant={status === "completed" ? "outline" : "default"}
        >
          {status === "completed" ? "View Details" : actionLabel}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ActionCard;
