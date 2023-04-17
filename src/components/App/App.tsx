import { Route, Routes } from "react-router-dom";
import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";
import PublicRoute from "../PublicRoute/PublicRoute";
import Registration from "../../pages/Registration/Registration";
import Login from "../../pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import EmployeeListPage from "../../pages/EmployeeListPage/EmployeeListPage";
import Projects from "../../pages/Projects/Projects";
import ChatRoom from "../../pages/ChatRoom/ChatRoom";
import Home from "../../pages/Home/Home";
import company from "../../store/company";
import EmployeeDetails from "../../pages/EmployeeDetails/EmployeeDetails";
import ProjectDetails from "../../pages/ProjectDetails/ProjectDetails";
import NotFound from "../../pages/NotFound/NotFound";

const App: React.FC = () => {
  const isLoading: boolean = company.isLoading;

  return (
    <>
      {isLoading && <Loader />}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<PublicRoute />}>
            <Route path="employee" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="registration" element={<Registration />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="employees" element={<EmployeeListPage />} />
            <Route
              path="employees/:employeeId/*"
              element={<EmployeeDetails />}
            />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId/*" element={<ProjectDetails />} />
            <Route path="chat" element={<ChatRoom />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
