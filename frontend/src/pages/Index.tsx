import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to Home page as we now have a proper homepage
  return <Navigate to="/home" replace />;
};

export default Index;
