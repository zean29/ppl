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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

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
  const [selectedPlacement, setSelectedPlacement] = useState<Placement | null>(
    null,
  );
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isEditPlacementOpen, setIsEditPlacementOpen] = useState(false);
  const [isChangeSupervisorOpen, setIsChangeSupervisorOpen] = useState(false);
  const [isChangeLocationOpen, setIsChangeLocationOpen] = useState(false);
  const [isCancelPlacementOpen, setIsCancelPlacementOpen] = useState(false);

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
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPlacement(placement);
                                    setIsViewDetailsOpen(true);
                                  }}
                                >
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPlacement(placement);
                                    setIsEditPlacementOpen(true);
                                  }}
                                >
                                  Edit Placement
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPlacement(placement);
                                    setIsChangeSupervisorOpen(true);
                                  }}
                                >
                                  Change Supervisor
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => {
                                    setSelectedPlacement(placement);
                                    setIsChangeLocationOpen(true);
                                  }}
                                >
                                  Change Location
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-red-600"
                                  onClick={() => {
                                    setSelectedPlacement(placement);
                                    setIsCancelPlacementOpen(true);
                                  }}
                                >
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

      {/* View Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Placement Details</DialogTitle>
            <DialogDescription>
              Detailed information about the placement.
            </DialogDescription>
          </DialogHeader>
          {selectedPlacement && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Placement ID</Label>
                <div className="col-span-3">{selectedPlacement.id}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Student</Label>
                <div className="col-span-3">
                  <div>{selectedPlacement.studentName}</div>
                  <div className="text-sm text-muted-foreground">
                    {selectedPlacement.studentId}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Location</Label>
                <div className="col-span-3">{selectedPlacement.location}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Supervisor</Label>
                <div className="col-span-3">{selectedPlacement.supervisor}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Period</Label>
                <div className="col-span-3">
                  {selectedPlacement.startDate} to {selectedPlacement.endDate}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Status</Label>
                <div className="col-span-3">
                  {getStatusBadge(selectedPlacement.status)}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Placement Dialog */}
      <Dialog open={isEditPlacementOpen} onOpenChange={setIsEditPlacementOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Placement</DialogTitle>
            <DialogDescription>Update the placement details.</DialogDescription>
          </DialogHeader>
          {selectedPlacement && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-start-date" className="text-right">
                  Start Date
                </Label>
                <Input
                  id="edit-start-date"
                  type="date"
                  className="col-span-3"
                  defaultValue={selectedPlacement.startDate}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-end-date" className="text-right">
                  End Date
                </Label>
                <Input
                  id="edit-end-date"
                  type="date"
                  className="col-span-3"
                  defaultValue={selectedPlacement.endDate}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-status" className="text-right">
                  Status
                </Label>
                <Select defaultValue={selectedPlacement.status}>
                  <SelectTrigger id="edit-status" className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditPlacementOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Here we would normally update the placement in the database
                // For now we'll just show a success message and close the dialog
                // Get the updated values from the form
                const startDateInput = document.getElementById(
                  "edit-start-date",
                ) as HTMLInputElement;
                const endDateInput = document.getElementById(
                  "edit-end-date",
                ) as HTMLInputElement;

                // Get the selected value from the Select component
                // This is a more reliable way to get the value
                const selectElement = document.querySelector(
                  "#edit-status",
                ) as HTMLSelectElement;

                // Create a copy of the placements array
                const updatedPlacements = [...placements];

                // Find the index of the placement to update
                const placementIndex = updatedPlacements.findIndex(
                  (p) => p.id === selectedPlacement?.id,
                );

                // If the placement is found, update it
                if (placementIndex !== -1) {
                  updatedPlacements[placementIndex] = {
                    ...updatedPlacements[placementIndex],
                    startDate:
                      startDateInput?.value ||
                      updatedPlacements[placementIndex].startDate,
                    endDate:
                      endDateInput?.value ||
                      updatedPlacements[placementIndex].endDate,
                    status: (selectElement?.value ||
                      updatedPlacements[placementIndex].status) as
                      | "pending"
                      | "active"
                      | "completed"
                      | "cancelled",
                  };
                }

                // In a real app, we would update the state with the new placements
                // and also update the database

                toast({
                  title: "Placement updated",
                  description: "The placement has been successfully updated.",
                });
                setIsEditPlacementOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Supervisor Dialog */}
      <Dialog
        open={isChangeSupervisorOpen}
        onOpenChange={setIsChangeSupervisorOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Change Supervisor</DialogTitle>
            <DialogDescription>
              Assign a different supervisor to this placement.
            </DialogDescription>
          </DialogHeader>
          {selectedPlacement && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">
                  Current Supervisor
                </Label>
                <div className="col-span-3">{selectedPlacement.supervisor}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-supervisor" className="text-right">
                  New Supervisor
                </Label>
                <Select>
                  <SelectTrigger id="new-supervisor" className="col-span-3">
                    <SelectValue placeholder="Select a supervisor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-robert-johnson">
                      Dr. Robert Johnson
                    </SelectItem>
                    <SelectItem value="prof-maria-garcia">
                      Prof. Maria Garcia
                    </SelectItem>
                    <SelectItem value="dr-james-wilson">
                      Dr. James Wilson
                    </SelectItem>
                    <SelectItem value="prof-linda-martinez">
                      Prof. Linda Martinez
                    </SelectItem>
                    <SelectItem value="dr-michael-brown">
                      Dr. Michael Brown
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="change-reason" className="text-right">
                  Reason for Change
                </Label>
                <Textarea
                  id="change-reason"
                  placeholder="Explain why the supervisor is being changed"
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsChangeSupervisorOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Supervisor changed",
                  description: "The supervisor has been successfully changed.",
                });
                setIsChangeSupervisorOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Location Dialog */}
      <Dialog
        open={isChangeLocationOpen}
        onOpenChange={setIsChangeLocationOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Change Location</DialogTitle>
            <DialogDescription>
              Assign a different location to this placement.
            </DialogDescription>
          </DialogHeader>
          {selectedPlacement && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">
                  Current Location
                </Label>
                <div className="col-span-3">{selectedPlacement.location}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="new-location" className="text-right">
                  New Location
                </Label>
                <Select>
                  <SelectTrigger id="new-location" className="col-span-3">
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="location-change-reason" className="text-right">
                  Reason for Change
                </Label>
                <Textarea
                  id="location-change-reason"
                  placeholder="Explain why the location is being changed"
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsChangeLocationOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                toast({
                  title: "Location changed",
                  description: "The location has been successfully changed.",
                });
                setIsChangeLocationOpen(false);
              }}
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Cancel Placement Dialog */}
      <Dialog
        open={isCancelPlacementOpen}
        onOpenChange={setIsCancelPlacementOpen}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Cancel Placement</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this placement? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>
          {selectedPlacement && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Placement ID</Label>
                <div className="col-span-3">{selectedPlacement.id}</div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label className="text-right font-medium">Student</Label>
                <div className="col-span-3">
                  {selectedPlacement.studentName}
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cancel-reason" className="text-right">
                  Reason for Cancellation
                </Label>
                <Textarea
                  id="cancel-reason"
                  placeholder="Explain why this placement is being cancelled"
                  className="col-span-3"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCancelPlacementOpen(false)}
            >
              No, Keep Placement
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                toast({
                  title: "Placement cancelled",
                  description: "The placement has been successfully cancelled.",
                });
                setIsCancelPlacementOpen(false);
              }}
            >
              Yes, Cancel Placement
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlacementsManagement;
