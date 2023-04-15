import { observer } from "mobx-react-lite";
import "./ProjectDetails.scss";
import { useEffect, useState } from "react";
import { ProjectType } from "../../utils/types/project";
import { Link, useLocation, useParams } from "react-router-dom";
import company from "../../utils/stores/company";
import { EmployeeType } from "../../utils/types/employee";
import { getProjectById } from "../../utils/services/companyAPI";
import Loader from "../../components/Loader/Loader";

const ProjectDetails: React.FC = observer(() => {
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
    </>
  );
});

export default ProjectDetails;
