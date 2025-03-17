import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, Eye, CheckCircle2, Clock } from "lucide-react";

interface Student {
  id: string;
  name: string;
  studentId: string;
  location: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "pending";
  progress: number;
}

const StudentList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Mock data for students
  const students: Student[] = [
    {
      id: "1",
      name: "John Smith",
      studentId: "S12345",
      location: "City High School",
      startDate: "Jan 15, 2024",
      endDate: "Apr 15, 2024",
      status: "active",
      progress: 65,
    },
    {
      id: "2",
      name: "Emily Johnson",
      studentId: "S12346",
      location: "City High School",
      startDate: "Jan 15, 2024",
      endDate: "Apr 15, 2024",
      status: "active",
      progress: 40,
    },
    {
      id: "3",
      name: "Michael Brown",
      studentId: "S12347",
      location: "Westside Academy",
      startDate: "Jan 15, 2024",
      endDate: "Apr 15, 2024",
      status: "active",
      progress: 75,
    },
    {
      id: "4",
      name: "Sarah Davis",
      studentId: "S12348",
      location: "Eastside College",
      startDate: "Oct 10, 2023",
      endDate: "Jan 10, 2024",
      status: "completed",
      progress: 100,
    },
    {
      id: "5",
      name: "Robert Wilson",
      studentId: "S12349",
      location: "Westside Academy",
      startDate: "Oct 10, 2023",
      endDate: "Jan 10, 2024",
      status: "completed",
      progress: 100,
    },
    {
      id: "6",
      name: "Jennifer Lee",
      studentId: "S12350",
      location: "City High School",
      startDate: "Apr 15, 2024",
      endDate: "Jul 15, 2024",
      status: "pending",
      progress: 0,
    },
  ];

  const filteredStudents = students.filter((student) => {
    // Filter by search query
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.location.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by tab
    const matchesTab =
      activeTab === "all" ||
      (activeTab === "active" && student.status === "active") ||
      (activeTab === "completed" && student.status === "completed") ||
      (activeTab === "pending" && student.status === "pending");

    return matchesSearch && matchesTab;
  });

  const getStatusBadge = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
            <Clock className="mr-1 h-3 w-3" />
            Active
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            <CheckCircle2 className="mr-1 h-3 w-3" />
            Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Students</CardTitle>
          <CardDescription>
            Manage and assess students assigned to you for PPL supervision
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search students..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Tabs
                defaultValue="all"
                className="w-full sm:w-auto"
                onValueChange={setActiveTab}
              >
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="text-center py-8 text-gray-500"
                      >
                        No students found matching your criteria
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">
                              {student.studentId}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{student.location}</TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{student.startDate}</p>
                            <p className="text-gray-500">
                              to {student.endDate}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(student.status)}</TableCell>
                        <TableCell>
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">
                            {student.progress}%
                          </span>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            {student.status === "active" && (
                              <Button variant="default" size="sm">
                                <FileText className="h-4 w-4 mr-1" />
                                Assess
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentList;
