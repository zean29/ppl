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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MapPin, Users, Calendar, CheckCircle } from "lucide-react";

interface Location {
  id: string;
  name: string;
  address: string;
  availableSlots: number;
  supervisors: Supervisor[];
}

interface Supervisor {
  id: string;
  name: string;
  specialization: string;
  availableSlots: number;
}

const PlacementSelection = () => {
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedSupervisor, setSelectedSupervisor] = useState<string>("");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock data for locations
  const locations: Location[] = [
    {
      id: "loc1",
      name: "City High School",
      address: "123 Education St, City Center",
      availableSlots: 5,
      supervisors: [
        {
          id: "sup1",
          name: "Dr. John Smith",
          specialization: "Mathematics",
          availableSlots: 3,
        },
        {
          id: "sup2",
          name: "Prof. Sarah Johnson",
          specialization: "Computer Science",
          availableSlots: 2,
        },
      ],
    },
    {
      id: "loc2",
      name: "Westside Academy",
      address: "456 Learning Ave, West District",
      availableSlots: 3,
      supervisors: [
        {
          id: "sup3",
          name: "Dr. Michael Brown",
          specialization: "Physics",
          availableSlots: 2,
        },
        {
          id: "sup4",
          name: "Prof. Emily Davis",
          specialization: "Biology",
          availableSlots: 1,
        },
      ],
    },
    {
      id: "loc3",
      name: "Eastside College",
      address: "789 Knowledge Blvd, East District",
      availableSlots: 4,
      supervisors: [
        {
          id: "sup5",
          name: "Dr. Robert Wilson",
          specialization: "Chemistry",
          availableSlots: 2,
        },
        {
          id: "sup6",
          name: "Prof. Jennifer Lee",
          specialization: "Information Systems",
          availableSlots: 2,
        },
      ],
    },
  ];

  // Mock data for periods
  const periods = [
    { id: "period1", name: "January - March 2024" },
    { id: "period2", name: "April - June 2024" },
    { id: "period3", name: "July - September 2024" },
    { id: "period4", name: "October - December 2024" },
  ];

  const getLocationById = (id: string) => {
    return locations.find((location) => location.id === id);
  };

  const getSupervisorById = (locationId: string, supervisorId: string) => {
    const location = getLocationById(locationId);
    return location?.supervisors.find(
      (supervisor) => supervisor.id === supervisorId,
    );
  };

  const handleLocationChange = (value: string) => {
    setSelectedLocation(value);
    setSelectedSupervisor(""); // Reset supervisor when location changes
  };

  const handleSubmit = () => {
    if (!selectedLocation || !selectedSupervisor || !selectedPeriod) {
      alert(
        "Please select a location, supervisor, and period before submitting.",
      );
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Placement selection submitted:", {
        locationId: selectedLocation,
        supervisorId: selectedSupervisor,
        periodId: selectedPeriod,
      });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const selectedLocationData = getLocationById(selectedLocation);

  if (isSubmitted) {
    const location = getLocationById(selectedLocation);
    const supervisor = getSupervisorById(selectedLocation, selectedSupervisor);
    const period = periods.find((p) => p.id === selectedPeriod);

    return (
      <div className="container mx-auto py-8 px-4">
        <Card className="w-full max-w-3xl mx-auto bg-white">
          <CardHeader className="bg-green-50 border-b">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <CardTitle className="text-xl font-bold text-green-800">
                Placement Selection Confirmed
              </CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Your PPL placement has been successfully submitted and is pending
              approval
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-3">
                  Selected Placement Details
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{location?.name}</p>
                      <p className="text-sm text-gray-500">
                        {location?.address}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Users className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">{supervisor?.name}</p>
                      <p className="text-sm text-gray-500">
                        Specialization: {supervisor?.specialization}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                    <div>
                      <p className="font-medium">PPL Period</p>
                      <p className="text-sm text-gray-500">{period?.name}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="rounded-md bg-blue-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1 md:flex md:justify-between">
                    <p className="text-sm text-blue-700">
                      You will receive an email notification once your placement
                      is approved by the administrator.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setIsSubmitted(false)}
            >
              Make Another Selection
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-3xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            PPL Placement Selection
          </CardTitle>
          <CardDescription>
            Select your preferred PPL location, supervisor, and period
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Select Location</h3>
              <Select
                onValueChange={handleLocationChange}
                value={selectedLocation}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a PPL location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name} ({location.availableSlots} slots
                      available)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedLocationData && (
                <div className="mt-2 text-sm text-gray-500">
                  <p>{selectedLocationData.address}</p>
                </div>
              )}
            </div>

            {selectedLocation && (
              <div>
                <h3 className="text-lg font-medium mb-3">Select Supervisor</h3>
                <RadioGroup
                  value={selectedSupervisor}
                  onValueChange={setSelectedSupervisor}
                  className="space-y-3"
                >
                  {selectedLocationData?.supervisors.map((supervisor) => (
                    <div
                      key={supervisor.id}
                      className="flex items-center space-x-2 rounded-md border p-3"
                    >
                      <RadioGroupItem
                        value={supervisor.id}
                        id={supervisor.id}
                      />
                      <Label
                        htmlFor={supervisor.id}
                        className="flex-1 cursor-pointer"
                      >
                        <div>
                          <p className="font-medium">{supervisor.name}</p>
                          <p className="text-sm text-gray-500">
                            Specialization: {supervisor.specialization}
                          </p>
                          <p className="text-sm text-gray-500">
                            Available Slots: {supervisor.availableSlots}
                          </p>
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}

            {selectedLocation && selectedSupervisor && (
              <div>
                <h3 className="text-lg font-medium mb-3">Select PPL Period</h3>
                <RadioGroup
                  value={selectedPeriod}
                  onValueChange={setSelectedPeriod}
                  className="space-y-3"
                >
                  {periods.map((period) => (
                    <div
                      key={period.id}
                      className="flex items-center space-x-2 rounded-md border p-3"
                    >
                      <RadioGroupItem value={period.id} id={period.id} />
                      <Label
                        htmlFor={period.id}
                        className="flex-1 cursor-pointer"
                      >
                        {period.name}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={
              !selectedLocation ||
              !selectedSupervisor ||
              !selectedPeriod ||
              isSubmitting
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Placement Selection"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PlacementSelection;
