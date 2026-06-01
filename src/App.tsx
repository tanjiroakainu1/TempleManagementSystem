import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth, getRoleFolder } from '@/context/AuthContext';
import AppLayout from '@/components/layout/AppLayout';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import RolePage from '@/routes/RolePage';
import SharedActivityLog from '@/roles/shared/ActivityLog';
import { ROLES } from '@/config/roles';
import DeveloperCredit from '@/components/layout/DeveloperCredit';

function ProtectedLayout() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-gradient-to-b from-candy-100 to-cream px-4 gap-4">
        <p className="text-candy-600 font-bold animate-pulse">Loading…</p>
        <DeveloperCredit variant="mini" />
      </div>
    );
  }
  if (!user) return <Navigate to="/login" replace />;
  return <AppLayout />;
}

function RoleHomeRedirect() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/${getRoleFolder(user.role)}/dashboard`} replace />;
}

const roleFolders = Object.values(ROLES).map((r) => r.folder);

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/shared/activity-log" element={<SharedActivityLog />} />
        {roleFolders.map((folder) => (
          <Route key={folder} path={`/${folder}`} element={<Navigate to={`/${folder}/dashboard`} replace />} />
        ))}
        {roleFolders.map((folder) => (
          <Route key={`${folder}-pages`} path={`/${folder}/:pageSlug`} element={<RolePage />} />
        ))}
        <Route path="/dashboard" element={<RoleHomeRedirect />} />
        <Route path="*" element={<RoleHomeRedirect />} />
      </Route>
    </Routes>
  );
}
