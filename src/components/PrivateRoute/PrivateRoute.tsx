import { Outlet, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import company from "../../stores/company";

const PrivateRoute: React.FC = observer(() => {
  const token: boolean = company.token;
  return token ? <Outlet /> : <Navigate to="/" />;
});

export default PrivateRoute;
