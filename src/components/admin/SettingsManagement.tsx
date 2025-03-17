import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Save, RefreshCw, Calendar, Mail, Bell, Shield } from "lucide-react";
import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { useAuth } from "@/contexts/AuthContext";

const SettingsManagement = () => {
  const { user } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock settings state
  const [generalSettings, setGeneralSettings] = useState({
    systemName: "PPL Management System",
    contactEmail: "admin@pplsystem.edu",
    supportPhone: "123-456-7890",
    academicYear: "2024-2025",
    semesterPeriod: "January 2024 - July 2024",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    registrationAlerts: true,
    placementAlerts: true,
    assessmentAlerts: true,
    certificateAlerts: true,
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordExpiry: 90,
    sessionTimeout: 30,
    allowStudentRegistration: true,
    allowSupervisorRegistration: false,
  });

  const handleGeneralSettingsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setGeneralSettings({
      ...generalSettings,
      [name]: value,
    });
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]:
        !notificationSettings[setting as keyof typeof notificationSettings],
    });
  };

  const handleSecurityToggle = (setting: string) => {
    setSecuritySettings({
      ...securitySettings,
      [setting]: !securitySettings[setting as keyof typeof securitySettings],
    });
  };

  const handleSecurityInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setSecuritySettings({
      ...securitySettings,
      [name]: parseInt(value),
    });
  };

  const handleSaveSettings = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      // Show success message or toast here
    }, 1000);
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
          <div className="max-w-4xl mx-auto space-y-6">
            <h1 className="text-2xl font-bold">System Settings</h1>
            <p className="text-gray-600">
              Configure system-wide settings for the PPL Management System.
            </p>

            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Security</TabsTrigger>
              </TabsList>

              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle>General Settings</CardTitle>
                    <CardDescription>
                      Configure basic system settings and information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="systemName">System Name</Label>
                        <Input
                          id="systemName"
                          name="systemName"
                          value={generalSettings.systemName}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <div className="flex items-center space-x-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="contactEmail"
                            name="contactEmail"
                            type="email"
                            value={generalSettings.contactEmail}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="supportPhone">Support Phone</Label>
                        <Input
                          id="supportPhone"
                          name="supportPhone"
                          value={generalSettings.supportPhone}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Label htmlFor="academicYear">
                          Current Academic Year
                        </Label>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <Input
                            id="academicYear"
                            name="academicYear"
                            value={generalSettings.academicYear}
                            onChange={handleGeneralSettingsChange}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="semesterPeriod">
                          Current Semester Period
                        </Label>
                        <Input
                          id="semesterPeriod"
                          name="semesterPeriod"
                          value={generalSettings.semesterPeriod}
                          onChange={handleGeneralSettingsChange}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Settings</CardTitle>
                    <CardDescription>
                      Configure how and when notifications are sent to users.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="emailNotifications">
                            Email Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Send notifications via email to users
                          </p>
                        </div>
                        <Switch
                          id="emailNotifications"
                          checked={notificationSettings.emailNotifications}
                          onCheckedChange={() =>
                            handleNotificationToggle("emailNotifications")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="smsNotifications">
                            SMS Notifications
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Send notifications via SMS to users
                          </p>
                        </div>
                        <Switch
                          id="smsNotifications"
                          checked={notificationSettings.smsNotifications}
                          onCheckedChange={() =>
                            handleNotificationToggle("smsNotifications")
                          }
                        />
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="registrationAlerts">
                            Registration Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when new registrations are submitted
                          </p>
                        </div>
                        <Switch
                          id="registrationAlerts"
                          checked={notificationSettings.registrationAlerts}
                          onCheckedChange={() =>
                            handleNotificationToggle("registrationAlerts")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="placementAlerts">
                            Placement Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when placements are assigned or changed
                          </p>
                        </div>
                        <Switch
                          id="placementAlerts"
                          checked={notificationSettings.placementAlerts}
                          onCheckedChange={() =>
                            handleNotificationToggle("placementAlerts")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="assessmentAlerts">
                            Assessment Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when assessments are submitted
                          </p>
                        </div>
                        <Switch
                          id="assessmentAlerts"
                          checked={notificationSettings.assessmentAlerts}
                          onCheckedChange={() =>
                            handleNotificationToggle("assessmentAlerts")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="certificateAlerts">
                            Certificate Alerts
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when certificates are issued
                          </p>
                        </div>
                        <Switch
                          id="certificateAlerts"
                          checked={notificationSettings.certificateAlerts}
                          onCheckedChange={() =>
                            handleNotificationToggle("certificateAlerts")
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Configure security and access control settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="twoFactorAuth">
                            Two-Factor Authentication
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Require two-factor authentication for all users
                          </p>
                        </div>
                        <Switch
                          id="twoFactorAuth"
                          checked={securitySettings.twoFactorAuth}
                          onCheckedChange={() =>
                            handleSecurityToggle("twoFactorAuth")
                          }
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="passwordExpiry">
                            Password Expiry (days)
                          </Label>
                          <Input
                            id="passwordExpiry"
                            name="passwordExpiry"
                            type="number"
                            value={securitySettings.passwordExpiry}
                            onChange={handleSecurityInputChange}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="sessionTimeout">
                            Session Timeout (minutes)
                          </Label>
                          <Input
                            id="sessionTimeout"
                            name="sessionTimeout"
                            type="number"
                            value={securitySettings.sessionTimeout}
                            onChange={handleSecurityInputChange}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="allowStudentRegistration">
                            Allow Student Registration
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Allow students to register themselves in the system
                          </p>
                        </div>
                        <Switch
                          id="allowStudentRegistration"
                          checked={securitySettings.allowStudentRegistration}
                          onCheckedChange={() =>
                            handleSecurityToggle("allowStudentRegistration")
                          }
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="allowSupervisorRegistration">
                            Allow Supervisor Registration
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Allow supervisors to register themselves in the
                            system
                          </p>
                        </div>
                        <Switch
                          id="allowSupervisorRegistration"
                          checked={securitySettings.allowSupervisorRegistration}
                          onCheckedChange={() =>
                            handleSecurityToggle("allowSupervisorRegistration")
                          }
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end space-x-2">
              <Button variant="outline" disabled={isSaving}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleSaveSettings} disabled={isSaving}>
                {isSaving ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SettingsManagement;
