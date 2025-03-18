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
  UserCheck,
  FileText,
  Edit,
  AlertCircle,
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [selectedSupervisor, setSelectedSupervisor] =
    useState<Supervisor | null>(null);
  const [isViewProfileOpen, setIsViewProfileOpen] = useState(false);
  const [isViewStudentsOpen, setIsViewStudentsOpen] = useState(false);
  const [isEditDetailsOpen, setIsEditDetailsOpen] = useState(false);
  const [isStatusChangeOpen, setIsStatusChangeOpen] = useState(false);

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
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedSupervisor(supervisor);
                                    setIsViewProfileOpen(true);
                                  }}
                                >
                                  View Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedSupervisor(supervisor);
                                    setIsViewStudentsOpen(true);
                                  }}
                                >
                                  View Assigned Students
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedSupervisor(supervisor);
                                    setIsEditDetailsOpen(true);
                                  }}
                                >
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedSupervisor(supervisor);
                                    setIsStatusChangeOpen(true);
                                  }}
                                >
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

      {/* View Profile Dialog */}
      <Dialog open={isViewProfileOpen} onOpenChange={setIsViewProfileOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Supervisor Profile</DialogTitle>
            <DialogDescription>
              Detailed information about the supervisor.
            </DialogDescription>
          </DialogHeader>
          {selectedSupervisor && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center justify-center mb-4">
                <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserCheck className="h-12 w-12 text-gray-500" />
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">ID</Label>
                <div className="col-span-3">{selectedSupervisor.id}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Name</Label>
                <div className="col-span-3">{selectedSupervisor.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Email</Label>
                <div className="col-span-3">{selectedSupervisor.email}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Phone</Label>
                <div className="col-span-3">{selectedSupervisor.phone}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Specialization</Label>
                <div className="col-span-3">
                  {selectedSupervisor.specialization}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Location</Label>
                <div className="col-span-3">{selectedSupervisor.location}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">
                  Assigned Students
                </Label>
                <div className="col-span-3">
                  {selectedSupervisor.assignedStudents}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Status</Label>
                <div className="col-span-3">
                  {getStatusBadge(selectedSupervisor.status)}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewProfileOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Assigned Students Dialog */}
      <Dialog open={isViewStudentsOpen} onOpenChange={setIsViewStudentsOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Assigned Students</DialogTitle>
            <DialogDescription>
              Students currently assigned to this supervisor.
            </DialogDescription>
          </DialogHeader>
          {selectedSupervisor && (
            <div className="py-4">
              <div className="mb-4">
                <h3 className="text-lg font-medium">
                  {selectedSupervisor.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  Total Students: {selectedSupervisor.assignedStudents}
                </p>
              </div>

              {selectedSupervisor.assignedStudents > 0 ? (
                <div className="border rounded-md">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {/* Mock data for assigned students */}
                      {selectedSupervisor.id === "SUP001" && (
                        <>
                          <TableRow>
                            <TableCell>STD20240001</TableCell>
                            <TableCell>John Smith</TableCell>
                            <TableCell>City High School</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-green-50 text-green-700 border-green-200"
                              >
                                Active
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>STD20240005</TableCell>
                            <TableCell>David Wilson</TableCell>
                            <TableCell>City High School</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-yellow-50 text-yellow-700 border-yellow-200"
                              >
                                Pending
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                      {selectedSupervisor.id === "SUP002" && (
                        <>
                          <TableRow>
                            <TableCell>STD20240002</TableCell>
                            <TableCell>Sarah Johnson</TableCell>
                            <TableCell>Westside Academy</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-yellow-50 text-yellow-700 border-yellow-200"
                              >
                                Pending
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                      {selectedSupervisor.id === "SUP003" && (
                        <>
                          <TableRow>
                            <TableCell>STD20240003</TableCell>
                            <TableCell>Michael Brown</TableCell>
                            <TableCell>Eastside College</TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="bg-blue-50 text-blue-700 border-blue-200"
                              >
                                Completed
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <FileText className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </>
                      )}
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium">No Students Assigned</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    This supervisor currently has no students assigned.
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewStudentsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Details Dialog */}
      <Dialog open={isEditDetailsOpen} onOpenChange={setIsEditDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Supervisor Details</DialogTitle>
            <DialogDescription>
              Update the supervisor's information.
            </DialogDescription>
          </DialogHeader>
          {selectedSupervisor && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right">
                  Full Name
                </Label>
                <Input
                  id="edit-name"
                  className="col-span-3"
                  defaultValue={selectedSupervisor.name}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  className="col-span-3"
                  defaultValue={selectedSupervisor.email}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  className="col-span-3"
                  defaultValue={selectedSupervisor.phone}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-specialization" className="text-right">
                  Specialization
                </Label>
                <Input
                  id="edit-specialization"
                  className="col-span-3"
                  defaultValue={selectedSupervisor.specialization}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-location" className="text-right">
                  Location
                </Label>
                <Select
                  defaultValue={selectedSupervisor.location
                    .toLowerCase()
                    .replace(/ /g, "-")}
                >
                  <SelectTrigger id="edit-location" className="col-span-3">
                    <SelectValue placeholder="Select a location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city-high-school">
                      City High School
                    </SelectItem>
                    <SelectItem value="westside-academy">
                      Westside Academy
                    </SelectItem>
                    <SelectItem value="eastside-college">
                      Eastside College
                    </SelectItem>
                    <SelectItem value="north-technical-institute">
                      North Technical Institute
                    </SelectItem>
                    <SelectItem value="south-community-school">
                      South Community School
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDetailsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Supervisor updated",
                  description:
                    "The supervisor details have been successfully updated.",
                });
                setIsEditDetailsOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Change Dialog */}
      <Dialog open={isStatusChangeOpen} onOpenChange={setIsStatusChangeOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {selectedSupervisor?.status === "active"
                ? "Deactivate"
                : "Activate"}{" "}
              Supervisor
            </DialogTitle>
            <DialogDescription>
              {selectedSupervisor?.status === "active"
                ? "Are you sure you want to deactivate this supervisor? They will no longer be able to access the system or be assigned new students."
                : "Are you sure you want to activate this supervisor? They will be able to access the system and be assigned students."}
            </DialogDescription>
          </DialogHeader>
          {selectedSupervisor && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Supervisor</Label>
                <div className="col-span-3">{selectedSupervisor.name}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Current Status</Label>
                <div className="col-span-3">
                  {getStatusBadge(selectedSupervisor.status)}
                </div>
              </div>
              {selectedSupervisor.status === "active" &&
                selectedSupervisor.assignedStudents > 0 && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right font-medium">Warning</Label>
                    <div className="col-span-3 text-amber-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2" />
                      <span>
                        This supervisor has{" "}
                        {selectedSupervisor.assignedStudents} assigned students.
                        Deactivating will require reassigning these students.
                      </span>
                    </div>
                  </div>
                )}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status-change-reason" className="text-right">
                  Reason
                </Label>
                <Textarea
                  id="status-change-reason"
                  placeholder={`Explain why you are ${selectedSupervisor.status === "active" ? "deactivating" : "activating"} this supervisor`}
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsStatusChangeOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant={
                selectedSupervisor?.status === "active"
                  ? "destructive"
                  : "default"
              }
              onClick={() => {
                toast({
                  title:
                    selectedSupervisor?.status === "active"
                      ? "Supervisor deactivated"
                      : "Supervisor activated",
                  description:
                    selectedSupervisor?.status === "active"
                      ? "The supervisor has been successfully deactivated."
                      : "The supervisor has been successfully activated.",
                });
                setIsStatusChangeOpen(false);
              }}
            >
              {selectedSupervisor?.status === "active"
                ? "Deactivate"
                : "Activate"}{" "}
              Supervisor
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SupervisorsManagement;
