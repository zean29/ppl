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
import { MoreHorizontal, Search, FileCheck, X, Eye } from "lucide-react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

interface Registration {
  id: string;
  studentName: string;
  studentId: string;
  submissionDate: string;
  status: "pending" | "approved" | "rejected";
  documents: {
    name: string;
    status: "complete" | "incomplete" | "rejected";
  }[];
}

const RegistrationsManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Mock data
  const registrations: Registration[] = [
    {
      id: "REG001",
      studentName: "John Smith",
      studentId: "STD20240001",
      submissionDate: "2024-03-15",
      status: "pending",
      documents: [
        { name: "Academic Transcript", status: "complete" },
        { name: "Recommendation Letter", status: "complete" },
        { name: "Health Certificate", status: "incomplete" },
      ],
    },
    {
      id: "REG002",
      studentName: "Sarah Johnson",
      studentId: "STD20240002",
      submissionDate: "2024-03-14",
      status: "approved",
      documents: [
        { name: "Academic Transcript", status: "complete" },
        { name: "Recommendation Letter", status: "complete" },
        { name: "Health Certificate", status: "complete" },
      ],
    },
    {
      id: "REG003",
      studentName: "Michael Brown",
      studentId: "STD20240003",
      submissionDate: "2024-03-13",
      status: "rejected",
      documents: [
        { name: "Academic Transcript", status: "complete" },
        { name: "Recommendation Letter", status: "rejected" },
        { name: "Health Certificate", status: "complete" },
      ],
    },
    {
      id: "REG004",
      studentName: "Emily Davis",
      studentId: "STD20240004",
      submissionDate: "2024-03-12",
      status: "pending",
      documents: [
        { name: "Academic Transcript", status: "complete" },
        { name: "Recommendation Letter", status: "incomplete" },
        { name: "Health Certificate", status: "complete" },
      ],
    },
    {
      id: "REG005",
      studentName: "David Wilson",
      studentId: "STD20240005",
      submissionDate: "2024-03-11",
      status: "approved",
      documents: [
        { name: "Academic Transcript", status: "complete" },
        { name: "Recommendation Letter", status: "complete" },
        { name: "Health Certificate", status: "complete" },
      ],
    },
  ];

  const filteredRegistrations = registrations.filter((registration) => {
    const matchesSearch =
      registration.studentName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      registration.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      registration.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? registration.status === statusFilter
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
      case "approved":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Rejected
          </Badge>
        );
      case "complete":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Complete
          </Badge>
        );
      case "incomplete":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Incomplete
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
            <h1 className="text-2xl font-bold">Registration Management</h1>
            <p className="text-gray-600">
              Review and manage student registrations for the PPL program.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Student Registrations</CardTitle>
                <CardDescription>
                  View and manage all student registration applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or ID..."
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
                        statusFilter === "approved" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("approved")}
                    >
                      Approved
                    </Button>
                    <Button
                      variant={
                        statusFilter === "rejected" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("rejected")}
                    >
                      Rejected
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Registration ID</TableHead>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Submission Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((registration) => (
                        <TableRow key={registration.id}>
                          <TableCell className="font-medium">
                            {registration.id}
                          </TableCell>
                          <TableCell>{registration.studentName}</TableCell>
                          <TableCell>{registration.studentId}</TableCell>
                          <TableCell>{registration.submissionDate}</TableCell>
                          <TableCell>
                            {getStatusBadge(registration.status)}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-1">
                              {registration.documents.map((doc, index) => {
                                let icon;
                                switch (doc.status) {
                                  case "complete":
                                    icon = (
                                      <FileCheck
                                        size={16}
                                        className="text-green-500"
                                      />
                                    );
                                    break;
                                  case "incomplete":
                                    icon = (
                                      <Eye
                                        size={16}
                                        className="text-yellow-500"
                                      />
                                    );
                                    break;
                                  case "rejected":
                                    icon = (
                                      <X size={16} className="text-red-500" />
                                    );
                                    break;
                                  default:
                                    icon = <FileCheck size={16} />;
                                }
                                return (
                                  <span
                                    key={index}
                                    className="inline-flex items-center"
                                    title={`${doc.name}: ${doc.status}`}
                                  >
                                    {icon}
                                  </span>
                                );
                              })}
                            </div>
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
                                <DropdownMenuItem>
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Approve</DropdownMenuItem>
                                <DropdownMenuItem>Reject</DropdownMenuItem>
                                <DropdownMenuItem>
                                  Request Documents
                                </DropdownMenuItem>
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

export default RegistrationsManagement;
