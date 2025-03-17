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
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { AlertCircle, Save, Send } from "lucide-react";

const formSchema = z.object({
  teachingSkills: z.number().min(1).max(100),
  classroomManagement: z.number().min(1).max(100),
  lessonPlanning: z.number().min(1).max(100),
  studentEngagement: z.number().min(1).max(100),
  professionalConduct: z.number().min(1).max(100),
  overallPerformance: z.string().min(1, {
    message: "Please select an overall performance rating.",
  }),
  strengths: z.string().min(10, {
    message: "Please provide at least 10 characters for strengths.",
  }),
  areasForImprovement: z.string().min(10, {
    message: "Please provide at least 10 characters for areas of improvement.",
  }),
  recommendations: z.string().min(10, {
    message: "Please provide at least 10 characters for recommendations.",
  }),
  additionalComments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface StudentInfo {
  id: string;
  name: string;
  studentId: string;
  location: string;
  period: string;
  assessmentType: "midterm" | "final";
}

interface AssessmentFormProps {
  student?: StudentInfo;
}

const AssessmentForm = ({
  student = {
    id: "1",
    name: "John Smith",
    studentId: "S12345",
    location: "City High School",
    period: "Jan 15, 2024 - Apr 15, 2024",
    assessmentType: "midterm" as const,
  },
}: AssessmentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      teachingSkills: 70,
      classroomManagement: 65,
      lessonPlanning: 75,
      studentEngagement: 80,
      professionalConduct: 85,
      overallPerformance: "",
      strengths: "",
      areasForImprovement: "",
      recommendations: "",
      additionalComments: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call to submit assessment
      console.log("Assessment submitted for student:", student);
      console.log("Assessment values:", values);

      // Calculate average score
      const scores = [
        values.teachingSkills,
        values.classroomManagement,
        values.lessonPlanning,
        values.studentEngagement,
        values.professionalConduct,
      ];
      const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
      console.log("Average score:", averageScore);

      // Simulate submission delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Assessment submitted successfully!");
      // Redirect or show success message
    } catch (error) {
      console.error("Assessment submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // In a real app, this would be an API call to save draft
      const values = form.getValues();
      console.log("Assessment draft saved for student:", student);
      console.log("Draft values:", values);

      // Simulate saving delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Assessment draft saved successfully!");
    } catch (error) {
      console.error("Saving draft failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const formatSliderValue = (value: number) => {
    if (value < 60) return "Poor";
    if (value < 70) return "Fair";
    if (value < 80) return "Good";
    if (value < 90) return "Very Good";
    return "Excellent";
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="w-full max-w-4xl mx-auto bg-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {student.assessmentType === "midterm" ? "Midterm" : "Final"}{" "}
            Assessment
          </CardTitle>
          <CardDescription>
            Evaluate the teaching performance of {student.name} (
            {student.studentId})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="rounded-md bg-blue-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Assessment Information
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Student: {student.name}</p>
                    <p>Student ID: {student.studentId}</p>
                    <p>Location: {student.location}</p>
                    <p>Period: {student.period}</p>
                    <p>
                      Assessment Type:{" "}
                      {student.assessmentType === "midterm"
                        ? "Midterm Evaluation"
                        : "Final Evaluation"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Performance Evaluation
                  </h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="teachingSkills"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Teaching Skills</FormLabel>
                            <span className="text-sm font-medium">
                              {field.value}/100 (
                              {formatSliderValue(field.value)})
                            </span>
                          </div>
                          <FormControl>
                            <Slider
                              defaultValue={[field.value]}
                              max={100}
                              step={1}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Ability to effectively communicate concepts and
                            engage students
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="classroomManagement"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Classroom Management</FormLabel>
                            <span className="text-sm font-medium">
                              {field.value}/100 (
                              {formatSliderValue(field.value)})
                            </span>
                          </div>
                          <FormControl>
                            <Slider
                              defaultValue={[field.value]}
                              max={100}
                              step={1}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Ability to maintain discipline and create a positive
                            learning environment
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lessonPlanning"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Lesson Planning</FormLabel>
                            <span className="text-sm font-medium">
                              {field.value}/100 (
                              {formatSliderValue(field.value)})
                            </span>
                          </div>
                          <FormControl>
                            <Slider
                              defaultValue={[field.value]}
                              max={100}
                              step={1}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Quality and organization of lesson plans and
                            materials
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="studentEngagement"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Student Engagement</FormLabel>
                            <span className="text-sm font-medium">
                              {field.value}/100 (
                              {formatSliderValue(field.value)})
                            </span>
                          </div>
                          <FormControl>
                            <Slider
                              defaultValue={[field.value]}
                              max={100}
                              step={1}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Ability to engage and motivate students in the
                            learning process
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="professionalConduct"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between items-center">
                            <FormLabel>Professional Conduct</FormLabel>
                            <span className="text-sm font-medium">
                              {field.value}/100 (
                              {formatSliderValue(field.value)})
                            </span>
                          </div>
                          <FormControl>
                            <Slider
                              defaultValue={[field.value]}
                              max={100}
                              step={1}
                              onValueChange={(vals) => field.onChange(vals[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Professionalism, punctuality, and adherence to
                            school policies
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Overall Assessment
                  </h3>
                  <div className="space-y-6">
                    <FormField
                      control={form.control}
                      name="overallPerformance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Overall Performance Rating</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select an overall rating" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="excellent">
                                Excellent (A)
                              </SelectItem>
                              <SelectItem value="very_good">
                                Very Good (B+)
                              </SelectItem>
                              <SelectItem value="good">Good (B)</SelectItem>
                              <SelectItem value="satisfactory">
                                Satisfactory (C)
                              </SelectItem>
                              <SelectItem value="needs_improvement">
                                Needs Improvement (D)
                              </SelectItem>
                              <SelectItem value="unsatisfactory">
                                Unsatisfactory (F)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="strengths"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Strengths</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the student's teaching strengths"
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
                      name="areasForImprovement"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Areas for Improvement</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Identify areas where the student needs to improve"
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
                      name="recommendations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Recommendations</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Provide specific recommendations for improvement"
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
                      name="additionalComments"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Additional Comments (Optional)</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Any additional comments or observations"
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleSaveDraft}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                      </>
                    )}
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Submitting..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Assessment
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AssessmentForm;
