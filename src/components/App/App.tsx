import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";
import PublicRoute from "../PublicRoute/PublicRoute";
import Registration from "../../pages/Registration/Registration";
import Login from "../../pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Projects from "../../pages/ProjectsListPage/ProjectsListPage";
import Chat from "../../pages/Chat/Chat";
import Home from "../../pages/Home/Home";
import company from "../../stores/company";
import ProjectDetails from "../../pages/ProjectDetails/ProjectDetails";
import NotFound from "../../pages/NotFound/NotFound";

const EmployeeDetails = lazy(
  () => import("../../pages/EmployeeDetails/EmployeeDetails")
);

const EmployeeListPage = lazy(
  () => import("../../pages/EmployeeListPage/EmployeeListPage")
);

const App: React.FC = () => {
  const isLoading: boolean = company.isLoading;

  return (
    <>
      {isLoading && <Loader />}

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/" element={<PublicRoute />}>
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
              <Route
                path="projects/:projectId/*"
                element={<ProjectDetails />}
              />
              <Route path="chat" element={<Chat />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
