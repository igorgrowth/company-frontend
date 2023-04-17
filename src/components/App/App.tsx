import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loader from "../Loader/Loader";
import Layout from "../Layout/Layout";
import PublicRoute from "../PublicRoute/PublicRoute";
import Registration from "../../pages/Registration/Registration";
import Login from "../../pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import NotFound from "../../pages/NotFound/NotFound";
import AddProjectFormPage from "../../pages/AddProjectFormPage/AddProjectFormPage";

const Home = lazy(() => import("../../pages/Home/Home"));

const EmployeeListPage = lazy(
  () => import("../../pages/EmployeeListPage/EmployeeListPage")
);

const EmployeeDetails = lazy(
  () => import("../../pages/EmployeeDetails/EmployeeDetails")
);

const UpdateEmployeePage = lazy(
  () => import("../../pages/UpdateEmployeePage/UpdateEmployeePage")
);

const AddEmployeeFormPage = lazy(
  () => import("../../pages/AddEmployeeFormPage/AddEmployeeFormPage")
);

const ProjectListPage = lazy(
  () => import("../../pages/ProjectsListPage/ProjectsListPage")
);

const ProjectDetails = lazy(
  () => import("../../pages/ProjectDetails/ProjectDetails")
);

<<<<<<< HEAD
const Topic = lazy(
  () => import("../../pages/Topic/Topic")
=======
const UpdateProjectPage = lazy(
  () => import("../../pages/UpdateProjectPage/UpdateProjectPage")
>>>>>>> 3182ff682095db854d0128fed9f7b0ee93aac98c
);

const Chat = lazy(() => import("../../pages/Chat/Chat"));

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<Layout />}>
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

              <Route
                path="employees/:employeeId/updateemp"
                element={<UpdateEmployeePage />}
              />

              <Route path="newemployee" element={<AddEmployeeFormPage />} />

              <Route path="projects" element={<ProjectListPage />} />
              <Route
                path="projects/:projectId/*"
                element={<ProjectDetails />}
              />

              <Route
                path="projects/:projectId/updateproj"
                element={<UpdateProjectPage />}
              />

              <Route path="newproject" element={<AddProjectFormPage />} />

              <Route path="chat" element={<Chat />} />

              <Route path="topic" element={<Topic />} />



              <Route path="*" element={<NotFound />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
