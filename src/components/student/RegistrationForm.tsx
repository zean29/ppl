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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().min(3, {
    message: "Full name must be at least 3 characters.",
  }),
  studentId: z.string().min(5, {
    message: "Student ID must be at least 5 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  major: z.string().min(1, {
    message: "Please select your major.",
  }),
  semester: z.string().min(1, {
    message: "Please select your current semester.",
  }),
  emergencyContact: z.string().min(10, {
    message: "Emergency contact must be at least 10 digits.",
  }),
  agreementChecked: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const RegistrationForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<{
    transcript: boolean;
    idCard: boolean;
    photo: boolean;
    letterOfRecommendation: boolean;
  }>({
    transcript: false,
    idCard: false,
    photo: false,
    letterOfRecommendation: false,
  });

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      studentId: "",
      email: "",
      phone: "",
      address: "",
      major: "",
      semester: "",
      emergencyContact: "",
      agreementChecked: false,
    },
  });

  const handleFileUpload = (documentType: keyof typeof uploadedFiles) => {
    // Simulate file upload
    setIsLoading(true);
    setTimeout(() => {
      setUploadedFiles({
        ...uploadedFiles,
        [documentType]: true,
      });
      setIsLoading(false);
    }, 1000);
  };

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Check if all required documents are uploaded
      const allDocumentsUploaded = Object.values(uploadedFiles).every(
        (uploaded) => uploaded,
      );

      if (!allDocumentsUploaded) {
        alert("Please upload all required documents before submitting.");
        setIsLoading(false);
        return;
      }

      // In a real app, this would be an API call to submit registration
      console.log("Registration submitted with:", values);
      console.log("Uploaded documents:", uploadedFiles);

      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Registration submitted successfully!");
      // Redirect or show success message
    } catch (error) {
      console.error("Registration submission failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            PPL Registration Form
          </CardTitle>
          <CardDescription>
            Complete all required fields and upload necessary documents to
            register for PPL
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium">Personal Information</h3>
              <div className="mt-4">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="studentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Student ID</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your student ID"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email address"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="major"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Major</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your major" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="computer_science">
                                  Computer Science
                                </SelectItem>
                                <SelectItem value="information_systems">
                                  Information Systems
                                </SelectItem>
                                <SelectItem value="mathematics">
                                  Mathematics
                                </SelectItem>
                                <SelectItem value="physics">Physics</SelectItem>
                                <SelectItem value="chemistry">
                                  Chemistry
                                </SelectItem>
                                <SelectItem value="biology">Biology</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="semester"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Semester</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your semester" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (semester) => (
                                    <SelectItem
                                      key={semester}
                                      value={semester.toString()}
                                    >
                                      Semester {semester}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your current address"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="emergencyContact"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Emergency Contact</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter emergency contact number"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            This should be a contact number of a family member
                            or close relative
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div>
                      <h3 className="text-lg font-medium mb-4">
                        Required Documents
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <Label>Academic Transcript</Label>
                            </div>
                            {uploadedFiles.transcript ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-5 w-5 mr-1" />
                                <span className="text-sm">Uploaded</span>
                              </div>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleFileUpload("transcript")}
                                disabled={isLoading}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <Label>Student ID Card</Label>
                            </div>
                            {uploadedFiles.idCard ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-5 w-5 mr-1" />
                                <span className="text-sm">Uploaded</span>
                              </div>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleFileUpload("idCard")}
                                disabled={isLoading}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <Label>Passport Photo</Label>
                            </div>
                            {uploadedFiles.photo ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-5 w-5 mr-1" />
                                <span className="text-sm">Uploaded</span>
                              </div>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => handleFileUpload("photo")}
                                disabled={isLoading}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="border rounded-md p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-5 w-5 text-gray-500" />
                              <Label>Letter of Recommendation</Label>
                            </div>
                            {uploadedFiles.letterOfRecommendation ? (
                              <div className="flex items-center text-green-600">
                                <CheckCircle2 className="h-5 w-5 mr-1" />
                                <span className="text-sm">Uploaded</span>
                              </div>
                            ) : (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() =>
                                  handleFileUpload("letterOfRecommendation")
                                }
                                disabled={isLoading}
                              >
                                <Upload className="h-4 w-4 mr-2" />
                                Upload
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="agreementChecked"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              I agree to the terms and conditions of the PPL
                              program
                            </FormLabel>
                            <FormDescription>
                              By checking this box, you confirm that all
                              information provided is accurate and complete.
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isLoading}
                    >
                      {isLoading ? "Submitting..." : "Submit Registration"}
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegistrationForm;
