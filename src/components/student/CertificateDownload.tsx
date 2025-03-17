import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  Download,
  FileText,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface CertificateDownloadProps {
  status?: "pending" | "available" | "not-eligible";
  studentName?: string;
  completionDate?: string;
  certificateId?: string;
  grade?: string;
}

const CertificateDownload = ({
  status = "pending",
  studentName = "John Doe",
  completionDate = "December 15, 2023",
  certificateId = "PPL-2023-12345",
  grade = "A",
}: CertificateDownloadProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);
    // Simulate download delay
    setTimeout(() => {
      setIsDownloading(false);
      alert("Certificate downloaded successfully!");
    }, 2000);
  };

  const renderStatusBadge = () => {
    switch (status) {
      case "available":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Available for Download
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            Pending Completion
          </Badge>
        );
      case "not-eligible":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
            Not Eligible
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-3xl mx-auto bg-white">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="h-6 w-6 text-primary" />
              <CardTitle className="text-2xl font-bold">
                PPL Certificate
              </CardTitle>
            </div>
            {renderStatusBadge()}
          </div>
          <CardDescription>
            View and download your PPL completion certificate
          </CardDescription>
        </CardHeader>

        <CardContent>
          {status === "available" && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6 bg-gray-50">
                <div className="flex justify-center mb-6">
                  <div className="rounded-full bg-primary/10 p-3">
                    <Award className="h-12 w-12 text-primary" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-center mb-6">
                  Certificate of Completion
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Student Name:</span>
                    <span className="font-medium">{studentName}</span>
                  </div>
                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-gray-500">Certificate ID:</span>
                    <span className="font-medium">{certificateId}</span>
                  </div>
                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-gray-500">Completion Date:</span>
                    <span className="font-medium">{completionDate}</span>
                  </div>
                  <Separator />

                  <div className="flex justify-between">
                    <span className="text-gray-500">Final Grade:</span>
                    <span className="font-medium">{grade}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="w-full md:w-auto"
                >
                  {isDownloading ? (
                    "Downloading..."
                  ) : (
                    <>
                      <Download className="mr-2 h-4 w-4" />
                      Download Certificate
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {status === "pending" && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6 bg-yellow-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-yellow-800">
                      Certificate Not Yet Available
                    </h3>
                    <div className="mt-2 text-sm text-yellow-700">
                      <p>
                        Your PPL program is still in progress. The certificate
                        will be available once you have completed all
                        requirements and received final assessment.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Remaining Requirements</h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">Final Assessment</p>
                      <p className="text-sm text-gray-500">
                        Pending supervisor evaluation
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">PPL Report Submission</p>
                      <p className="text-sm text-gray-500">
                        Due by November 30, 2023
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {status === "not-eligible" && (
            <div className="space-y-6">
              <div className="rounded-lg border p-6 bg-red-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Not Eligible for Certificate
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      <p>
                        You are currently not eligible to receive a PPL
                        certificate. Please review the requirements below and
                        contact your supervisor for assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Eligibility Issues</h3>

                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Insufficient Attendance</p>
                      <p className="text-sm text-gray-500">
                        Required: 90%, Your attendance: 75%
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                    <div>
                      <p className="font-medium">Missing Final Report</p>
                      <p className="text-sm text-gray-500">
                        Report not submitted by the deadline
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex justify-between">
          {status === "not-eligible" && (
            <Button variant="outline" className="w-full">
              Contact Supervisor
            </Button>
          )}
          {status === "pending" && (
            <Button variant="outline" className="w-full">
              View PPL Progress
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default CertificateDownload;
