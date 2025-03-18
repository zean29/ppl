import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./components/home";
import routes from "tempo-routes";

// Lazy load components
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const RegisterForm = lazy(() => import("./components/auth/RegisterForm"));
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));

// Lazy load admin components
const RegistrationsManagement = lazy(
  () => import("./components/admin/RegistrationsManagement"),
);
const PlacementsManagement = lazy(
  () => import("./components/admin/PlacementsManagement"),
);
const SupervisorsManagement = lazy(
  () => import("./components/admin/SupervisorsManagement"),
);
const CertificatesManagement = lazy(
  () => import("./components/admin/CertificatesManagement"),
);
const SettingsManagement = lazy(
  () => import("./components/admin/SettingsManagement"),
);
const LocationManagement = lazy(
  () => import("./components/admin/LocationManagement"),
);

// Lazy load student components
const StudentDashboard = lazy(() => import("./components/student/Dashboard"));
const StudentRegistration = lazy(
  () => import("./components/student/RegistrationForm"),
);
const StudentPlacement = lazy(
  () => import("./components/student/PlacementSelection"),
);
const StudentCertificate = lazy(
  () => import("./components/student/CertificateDownload"),
);

// Lazy load supervisor components
const SupervisorDashboard = lazy(
  () => import("./components/supervisor/Dashboard"),
);
const SupervisorStudentList = lazy(
  () => import("./components/supervisor/StudentList"),
);
const SupervisorAssessment = lazy(
  () => import("./components/supervisor/AssessmentForm"),
);

function App() {
  return (
    <AuthProvider>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            Loading...
          </div>
        }
      >
        <>
          {/* For the tempo routes */}
          {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}

          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            <Route path="/" element={<ProtectedRoute />}>
              <Route index element={<Home />} />

              {/* Admin Routes */}
              <Route
                path="registrations"
                element={<RegistrationsManagement />}
              />
              <Route path="placements" element={<PlacementsManagement />} />
              <Route path="supervisors" element={<SupervisorsManagement />} />
              <Route path="certificates" element={<CertificatesManagement />} />
              <Route path="settings" element={<SettingsManagement />} />
              <Route path="locations" element={<LocationManagement />} />

              {/* Student Routes */}
              <Route path="student">
                <Route index element={<StudentDashboard view="overview" />} />
                <Route
                  path="registration"
                  element={<StudentDashboard view="registration" />}
                />
                <Route
                  path="placement"
                  element={<StudentDashboard view="placement" />}
                />
                <Route
                  path="certificate"
                  element={<StudentDashboard view="certificate" />}
                />
              </Route>

              {/* Supervisor Routes */}
              <Route path="supervisor">
                <Route
                  index
                  element={<SupervisorDashboard view="overview" />}
                />
                <Route
                  path="students"
                  element={<SupervisorDashboard view="students" />}
                />
                <Route
                  path="assessment/:studentId?"
                  element={<SupervisorDashboard view="assessment" />}
                />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Route>

            {/* Add this before the catchall route */}
            {import.meta.env.VITE_TEMPO === "true" && (
              <Route path="/tempobook/*" />
            )}
          </Routes>
        </>
      </Suspense>
    </AuthProvider>
  );
}

export default App;
