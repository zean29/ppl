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
import { MoreHorizontal, Search, MapPin, User, Calendar } from "lucide-react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

interface Placement {
  id: string;
  studentName: string;
  studentId: string;
  location: string;
  supervisor: string;
  startDate: string;
  endDate: string;
  status: "pending" | "active" | "completed" | "cancelled";
}

const PlacementsManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Mock data
  const placements: Placement[] = [
    {
      id: "PLC001",
      studentName: "John Smith",
      studentId: "STD20240001",
      location: "City High School",
      supervisor: "Dr. Robert Johnson",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      status: "active",
    },
    {
      id: "PLC002",
      studentName: "Sarah Johnson",
      studentId: "STD20240002",
      location: "Westside Academy",
      supervisor: "Prof. Maria Garcia",
      startDate: "2024-04-15",
      endDate: "2024-07-15",
      status: "pending",
    },
    {
      id: "PLC003",
      studentName: "Michael Brown",
      studentId: "STD20240003",
      location: "Eastside College",
      supervisor: "Dr. James Wilson",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      status: "completed",
    },
    {
      id: "PLC004",
      studentName: "Emily Davis",
      studentId: "STD20240004",
      location: "North Technical Institute",
      supervisor: "Prof. Linda Martinez",
      startDate: "2024-04-01",
      endDate: "2024-06-30",
      status: "cancelled",
    },
    {
      id: "PLC005",
      studentName: "David Wilson",
      studentId: "STD20240005",
      location: "City High School",
      supervisor: "Dr. Robert Johnson",
      startDate: "2024-05-01",
      endDate: "2024-07-31",
      status: "pending",
    },
  ];

  const filteredPlacements = placements.filter((placement) => {
    const matchesSearch =
      placement.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      placement.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? placement.status === statusFilter
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
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Active
          </Badge>
        );
      case "completed":
        return (
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge
            variant="outline"
            className="bg-red-50 text-red-700 border-red-200"
          >
            Cancelled
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
            <h1 className="text-2xl font-bold">Placement Management</h1>
            <p className="text-gray-600">
              Manage student placements, locations, and supervisor assignments.
            </p>

            <Card>
              <CardHeader>
                <CardTitle>Student Placements</CardTitle>
                <CardDescription>
                  View and manage all student placement assignments.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search placements..."
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
                        statusFilter === "active" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("active")}
                    >
                      Active
                    </Button>
                    <Button
                      variant={
                        statusFilter === "completed" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("completed")}
                    >
                      Completed
                    </Button>
                    <Button
                      variant={
                        statusFilter === "cancelled" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("cancelled")}
                    >
                      Cancelled
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Placement ID</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Supervisor</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPlacements.map((placement) => (
                        <TableRow key={placement.id}>
                          <TableCell className="font-medium">
                            {placement.id}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span>{placement.studentName}</span>
                              <span className="text-xs text-muted-foreground">
                                {placement.studentId}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{placement.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <User className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{placement.supervisor}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>
                                {placement.startDate} to {placement.endDate}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(placement.status)}
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
                                <DropdownMenuItem>
                                  Edit Placement
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Change Supervisor
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  Change Location
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600">
                                  Cancel Placement
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

export default PlacementsManagement;
