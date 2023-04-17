import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { ProjectType } from "../../utils/types/project";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import company from "../../utils/stores/company";
import { deleteProjectById, getProjectById } from "../../utils/services/companyAPI";
import Loader from "../../components/Loader/Loader";
import "./ProjectDetails.scss";

const ProjectDetails: React.FC = observer(() => {
    const navigate = useNavigate();
  const [projecttInfo, setProjectInfo] = useState<ProjectType | undefined>(
    undefined
  );
  const location = useLocation();
  const { projectId } = useParams();

  const getProjectInfo = async (projectId: number) => {
    try {
      company.setIsLoading(true);
      const receivedProjectInfo: ProjectType | undefined = await getProjectById(
        projectId
      );
      setProjectInfo(receivedProjectInfo);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  const deleteProject = async (projectId: number) => {
    try {
      company.setIsLoading(true);
      const response = await deleteProjectById(projectId);
      console.log(response);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getProjectInfo(Number(projectId));
  }, []);

  return (
    <>
      <Link className="project__go-back" to={location?.state?.from ?? "/"}>
        GO BACK
      </Link>

      {company.isLoading && <Loader />}

      <div className="project">
        <h2 className="project__name"> {projecttInfo?.name} </h2>
        {/* <p className="project__employee-list"> {projecttInfo?.employeeList} </p> */}
      </div>

      <Link className="project__update" to={"updateproj"}>
        UPDATE
      </Link>

      <button
        className="project__delete"
        type="submit"
        onClick={() => {
          deleteProject(Number(projectId));
        }}
      >
        DELETE
      </button>
    </>
  );
});

export default ProjectDetails;
