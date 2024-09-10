import { Navigate } from "react-router-dom";
import { auth } from "../../configs/firebase";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const user = auth.currentUser;

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
