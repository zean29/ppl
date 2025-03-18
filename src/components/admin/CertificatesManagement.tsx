import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MoreHorizontal,
  Search,
  Download,
  FileCheck,
  Award,
} from "lucide-react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface Certificate {
  id: string;
  studentName: string;
  studentId: string;
  issueDate: string;
  completionDate: string;
  grade: string;
  status: "pending" | "issued" | "revoked";
}

const CertificatesManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Mock data
  const certificates: Certificate[] = [
    {
      id: "CERT001",
      studentName: "John Smith",
      studentId: "STD20240001",
      issueDate: "2024-06-30",
      completionDate: "2024-06-15",
      grade: "A",
      status: "issued",
    },
    {
      id: "CERT002",
      studentName: "Sarah Johnson",
      studentId: "STD20240002",
      issueDate: "",
      completionDate: "2024-07-15",
      grade: "B+",
      status: "pending",
    },
    {
      id: "CERT003",
      studentName: "Michael Brown",
      studentId: "STD20240003",
      issueDate: "2024-05-31",
      completionDate: "2024-05-15",
      grade: "A-",
      status: "issued",
    },
    {
      id: "CERT004",
      studentName: "Emily Davis",
      studentId: "STD20240004",
      issueDate: "2024-06-30",
      completionDate: "2024-06-15",
      grade: "C+",
      status: "revoked",
    },
    {
      id: "CERT005",
      studentName: "David Wilson",
      studentId: "STD20240005",
      issueDate: "",
      completionDate: "2024-07-31",
      grade: "B",
      status: "pending",
    },
  ];

  const filteredCertificates = certificates.filter((certificate) => {
    const matchesSearch =
      certificate.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      certificate.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      certificate.grade.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? certificate.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "issued":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Issued
          </Badge>
        );
      case "revoked":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Revoked
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userRole="admin" userName={user?.fullName || user?.username} />
      <div className="flex">
        <Sidebar
          userRole="admin"
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">Certificate Management</h1>
            <p className="text-gray-600">
              Manage and issue certificates for students who have completed the
              PPL program.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Student Certificates</CardTitle>
                <CardDescription>
                  View, issue, and manage certificates for students who have
                  completed their PPL.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search certificates..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant={statusFilter === null ? "secondary" : "outline"}
                      size="sm"
                      onClick={() => setStatusFilter(null)}
                    >
                      All
                    </Button>
                    <Button
                      variant={
                        statusFilter === "pending" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("pending")}
                    >
                      Pending
                    </Button>
                    <Button
                      variant={
                        statusFilter === "issued" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("issued")}
                    >
                      Issued
                    </Button>
                    <Button
                      variant={
                        statusFilter === "revoked" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("revoked")}
                    >
                      Revoked
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Certificate ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Completion Date</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCertificates.map((certificate) => (
                        <TableRow key={certificate.id}>
                          <TableCell className="font-medium">
                            {certificate.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{certificate.studentName}</span>
                              <span className="text-xs text-muted-foreground">
                                {certificate.studentId}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{certificate.completionDate}</TableCell>
                          <TableCell>{certificate.issueDate || "-"}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <FileCheck className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{certificate.grade}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(certificate.status)}
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                  <span className="sr-only">Open menu</span>
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() => {
                                    // In a real app, this would download the certificate
                                    // For now, we'll just show an alert
                                    if (certificate.status === "issued") {
                                      // Create a dummy PDF download
                                      // Create a simple PDF with certificate information
                                      const certificateData = `
                                        Certificate of Completion
                                        
                                        This is to certify that
                                        
                                        ${certificate.studentName}
                                        
                                        has successfully completed the PPL program
                                        with a grade of ${certificate.grade}
                                        
                                        Issued on: ${certificate.issueDate}
                                        Certificate ID: ${certificate.id}
                                      `;

                                      // Create a Blob with the certificate data
                                      const blob = new Blob([certificateData], {
                                        type: "application/pdf",
                                      });
                                      const url = URL.createObjectURL(blob);

                                      const link = document.createElement("a");
                                      link.href = url;
                                      link.download = `${certificate.id}_${certificate.studentName.replace(/\s+/g, "_")}.pdf`;
                                      document.body.appendChild(link);
                                      link.click();
                                      document.body.removeChild(link);
                                      // Clean up the URL object
                                      URL.revokeObjectURL(url);

                                      toast({
                                        title: "Certificate Downloaded",
                                        description: `Certificate for ${certificate.studentName} has been downloaded.`,
                                      });
                                    } else {
                                      toast({
                                        title: "Cannot Download",
                                        description:
                                          "Certificate must be issued before it can be downloaded.",
                                        variant: "destructive",
                                      });
                                    }
                                  }}
                                >
                                  <Download className="h-4 w-4 mr-2" />
                                  Download Certificate
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    // In a real app, this would open a dialog with the certificate preview
                                    // For now, we'll just show an alert
                                    if (certificate.status === "issued") {
                                      // Create a simple PDF with certificate information
                                      const certificateData = `
                                        Certificate of Completion
                                        
                                        This is to certify that
                                        
                                        ${certificate.studentName}
                                        
                                        has successfully completed the PPL program
                                        with a grade of ${certificate.grade}
                                        
                                        Issued on: ${certificate.issueDate}
                                        Certificate ID: ${certificate.id}
                                      `;

                                      // Create a Blob with the certificate data
                                      const blob = new Blob([certificateData], {
                                        type: "application/pdf",
                                      });
                                      const url = URL.createObjectURL(blob);

                                      // Open in a new tab
                                      window.open(url, "_blank");

                                      // Clean up after a delay to ensure the window has time to load the URL
                                      setTimeout(() => {
                                        URL.revokeObjectURL(url);
                                      }, 1000);
                                    } else {
                                      toast({
                                        title: "Cannot View",
                                        description:
                                          "Certificate must be issued before it can be viewed.",
                                        variant: "destructive",
                                      });
                                    }
                                  }}
                                >
                                  <Award className="h-4 w-4 mr-2" />
                                  View Certificate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {certificate.status === "pending" ? (
                                  <DropdownMenuItem>
                                    Issue Certificate
                                  </DropdownMenuItem>
                                ) : certificate.status === "issued" ? (
                                  <DropdownMenuItem className="text-red-600">
                                    Revoke Certificate
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem>
                                    Reissue Certificate
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CertificatesManagement;
