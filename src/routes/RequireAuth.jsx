import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RequireAuth = ({ role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  if (role && user.role !== role) return <Navigate to={`/dashboard/${user.role}`} replace />;

  return <Outlet />;
};

export const DashboardRedirect = () => {
  const { user } = useAuth();
  return <Navigate to={`/dashboard/${user.role}`} replace />;
};

export default RequireAuth;
