import { Navigate, Outlet } from "react-router-dom";
import company from "../../stores/company";

const PublicRoute: React.FC = () => {
  const token: boolean = company.token;
  return token ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
