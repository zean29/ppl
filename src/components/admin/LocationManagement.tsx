import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MapPin, MoreHorizontal, Plus, Edit, Trash2, Users } from "lucide-react";

interface Location {
  id: string;
  name: string;
  address: string;
  capacity: number;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  status: "active" | "inactive";
  assignedSupervisors: number;
  assignedStudents: number;
}

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Location name must be at least 3 characters.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  capacity: z.coerce.number().min(1, {
    message: "Capacity must be at least 1.",
  }),
  contactPerson: z.string().min(3, {
    message: "Contact person name must be at least 3 characters.",
  }),
  contactEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  contactPhone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const LocationManagement = () => {
  const [locations, setLocations] = useState<Location[]>([
    {
      id: "loc1",
      name: "City High School",
      address: "123 Education St, City Center",
      capacity: 15,
      contactPerson: "John Principal",
      contactEmail: "principal@cityhs.edu",
      contactPhone: "123-456-7890",
      status: "active",
      assignedSupervisors: 3,
      assignedStudents: 8,
    },
    {
      id: "loc2",
      name: "Westside Academy",
      address: "456 Learning Ave, West District",
      capacity: 10,
      contactPerson: "Sarah Director",
      contactEmail: "director@westside.edu",
      contactPhone: "234-567-8901",
      status: "active",
      assignedSupervisors: 2,
      assignedStudents: 5,
    },
    {
      id: "loc3",
      name: "Eastside College",
      address: "789 Knowledge Blvd, East District",
      capacity: 12,
      contactPerson: "Michael Dean",
      contactEmail: "dean@eastside.edu",
      contactPhone: "345-678-9012",
      status: "active",
      assignedSupervisors: 2,
      assignedStudents: 6,
    },
    {
      id: "loc4",
      name: "North Technical Institute",
      address: "101 Tech Road, North Area",
      capacity: 8,
      contactPerson: "Emily Director",
      contactEmail: "director@northtech.edu",
      contactPhone: "456-789-0123",
      status: "inactive",
      assignedSupervisors: 0,
      assignedStudents: 0,
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      address: "",
      capacity: 0,
      contactPerson: "",
      contactEmail: "",
      contactPhone: "",
      notes: "",
    },
  });

  const handleAddLocation = (values: FormValues) => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const newLocation: Location = {
        id: `loc${locations.length + 1}`,
        name: values.name,
        address: values.address,
        capacity: values.capacity,
        contactPerson: values.contactPerson,
        contactEmail: values.contactEmail,
        contactPhone: values.contactPhone,
        status: "active",
        assignedSupervisors: 0,
        assignedStudents: 0,
      };

      setLocations([...locations, newLocation]);
      setIsSubmitting(false);
      setIsAddDialogOpen(false);
      form.reset();
    }, 1000);
  };

  const handleEditLocation = (values: FormValues) => {
    if (!currentLocation) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const updatedLocations = locations.map((location) =>
        location.id === currentLocation.id
          ? {
              ...location,
              name: values.name,
              address: values.address,
              capacity: values.capacity,
              contactPerson: values.contactPerson,
              contactEmail: values.contactEmail,
              contactPhone: values.contactPhone,
            }
          : location
      );

      setLocations(updatedLocations);
      setIsSubmitting(false);
      setIsEditDialogOpen(false);
      setCurrentLocation(null);
    }, 1000);
  };

  const handleDeleteLocation = () => {
    if (!currentLocation) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const updatedLocations = locations.filter(
        (location) => location.id !== currentLocation.id
      );

      setLocations(updatedLocations);
      setIsSubmitting(false);
      setIsDeleteDialogOpen(false);
      setCurrentLocation(null);
    }, 1000);
  };

  const handleEditClick = (location: Location) => {
    setCurrentLocation(location);
    form.reset({
      name: location.name,
      address: location.address,
      capacity: location.capacity,
      contactPerson: location.contactPerson,
      contactEmail: location.contactEmail,
      contactPhone: location.contactPhone,
      notes: "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (location: Location) => {
    setCurrentLocation(location);
    setIsDeleteDialogOpen(true);
  };

  const handleToggleStatus = (location: Location) => {
    const updatedLocations = locations.map((loc) =>
      loc.id ===