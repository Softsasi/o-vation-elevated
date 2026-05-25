import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin)
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="max-w-md text-center space-y-4">
          <h1 className="font-display text-3xl">Not authorized</h1>
          <p className="text-muted-foreground">
            Your account is signed in but does not have admin access. Contact Audrey to be granted access.
          </p>
        </div>
      </div>
    );
  return <>{children}</>;
};

export default RequireAdmin;
