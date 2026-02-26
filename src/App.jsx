import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import './i18n/i18n';

import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import AuthPage from './pages/AuthPage';
import RoleSelectPage from './pages/RoleSelectPage';

// Admin pages
import AdminDashboard from './pages/admin/Dashboard';
import AdminStudents from './pages/admin/Students';
import AdminFaculty from './pages/admin/Faculty';
import AdminCourses from './pages/admin/Courses';
import AdminAttendance from './pages/admin/Attendance';
import AdminFees from './pages/admin/Fees';
import AdminReports from './pages/admin/Reports';
import AdminResources from './pages/admin/Resources';
import AdminSettings from './pages/admin/Settings';

// Student pages
import StudentDashboard from './pages/student/Dashboard';
import StudentCourses from './pages/student/Courses';
import StudentAttendance from './pages/student/Attendance';
import StudentFees from './pages/student/Fees';
import StudentResources from './pages/student/Resources';
import StudentSettings from './pages/student/Settings';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<RoleSelectPage />} />
            <Route path="/login" element={<AuthPage />} />

            {/* ── Admin Routes ── */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="students" element={<AdminStudents />} />
              <Route path="faculty" element={<AdminFaculty />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="attendance" element={<AdminAttendance />} />
              <Route path="fees" element={<AdminFees />} />
              <Route path="reports" element={<AdminReports />} />
              <Route path="resources" element={<AdminResources />} />
              <Route path="settings" element={<AdminSettings />} />
            </Route>

            {/* ── Student Routes ── */}
            <Route
              path="/student"
              element={
                <ProtectedRoute requiredRole="student">
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="courses" element={<StudentCourses />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="fees" element={<StudentFees />} />
              <Route path="resources" element={<StudentResources />} />
              <Route path="settings" element={<StudentSettings />} />
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
