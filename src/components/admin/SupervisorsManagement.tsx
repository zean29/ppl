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
  Plus,
  Mail,
  Phone,
  MapPin,
  Users,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

interface Supervisor {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  location: string;
  assignedStudents: number;
  status: "active" | "inactive";
}

const SupervisorsManagement = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  // Mock data
  const supervisors: Supervisor[] = [
    {
      id: "SUP001",
      name: "Dr. Robert Johnson",
      email: "robert.johnson@university.edu",
      phone: "123-456-7890",
      specialization: "Mathematics Education",
      location: "City High School",
      assignedStudents: 5,
      status: "active",
    },
    {
      id: "SUP002",
      name: "Prof. Maria Garcia",
      email: "maria.garcia@university.edu",
      phone: "234-567-8901",
      specialization: "Science Education",
      location: "Westside Academy",
      assignedStudents: 3,
      status: "active",
    },
    {
      id: "SUP003",
      name: "Dr. James Wilson",
      email: "james.wilson@university.edu",
      phone: "345-678-9012",
      specialization: "Language Arts",
      location: "Eastside College",
      assignedStudents: 4,
      status: "active",
    },
    {
      id: "SUP004",
      name: "Prof. Linda Martinez",
      email: "linda.martinez@university.edu",
      phone: "456-789-0123",
      specialization: "Physical Education",
      location: "North Technical Institute",
      assignedStudents: 0,
      status: "inactive",
    },
    {
      id: "SUP005",
      name: "Dr. Michael Brown",
      email: "michael.brown@university.edu",
      phone: "567-890-1234",
      specialization: "Social Studies",
      location: "City High School",
      assignedStudents: 2,
      status: "active",
    },
  ];

  const filteredSupervisors = supervisors.filter((supervisor) => {
    const matchesSearch =
      supervisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.specialization
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      supervisor.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supervisor.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? supervisor.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200"
          >
            Inactive
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
            <h1 className="text-2xl font-bold">Supervisor Management</h1>
            <p className="text-gray-600">
              Manage DPL supervisors, their assignments, and availability.
            </p>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>DPL Supervisors</CardTitle>
                  <CardDescription>
                    View and manage all supervisors in the PPL program.
                  </CardDescription>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" /> Add Supervisor
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Supervisor</DialogTitle>
                      <DialogDescription>
                        Enter the details of the new supervisor to add them to
                        the system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">
                          Full Name
                        </label>
                        <Input id="name" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="email" className="text-right">
                          Email
                        </label>
                        <Input id="email" type="email" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="phone" className="text-right">
                          Phone
                        </label>
                        <Input id="phone" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="specialization" className="text-right">
                          Specialization
                        </label>
                        <Input id="specialization" className="col-span-3" />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="location" className="text-right">
                          Location
                        </label>
                        <Input id="location" className="col-span-3" />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Add Supervisor</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-4">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search supervisors..."
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
                        statusFilter === "active" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("active")}
                    >
                      Active
                    </Button>
                    <Button
                      variant={
                        statusFilter === "inactive" ? "secondary" : "outline"
                      }
                      size="sm"
                      onClick={() => setStatusFilter("inactive")}
                    >
                      Inactive
                    </Button>
                  </div>
                </div>

                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Specialization</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Students</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredSupervisors.map((supervisor) => (
                        <TableRow key={supervisor.id}>
                          <TableCell className="font-medium">
                            {supervisor.id}
                          </TableCell>
                          <TableCell>{supervisor.name}</TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">
                                  {supervisor.email}
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                                <span className="text-sm">
                                  {supervisor.phone}
                                </span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{supervisor.specialization}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{supervisor.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span>{supervisor.assignedStudents}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(supervisor.status)}
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
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  View Assigned Students
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  {supervisor.status === "active"
                                    ? "Deactivate"
                                    : "Activate"}
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

export default SupervisorsManagement;
