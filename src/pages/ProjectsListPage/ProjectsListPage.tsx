import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import company from "../../utils/stores/company";
import { observer } from "mobx-react-lite";
import Loader from "../../components/Loader/Loader";
import { ProjectType } from "../../utils/types/project";
import "./ProjectsListPage.scss";

const ProjectsListPage: React.FC = observer(() => {
  const location = useLocation();

  const getProjects = async (page: number) => {
    try {
      company.setIsLoading(true);
      await company.fetchProjects(page);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  useEffect(() => {
    getProjects(0);
  }, []);

  return (
    <>
      {company.isLoading && <Loader />}
      <ul className="project-list">
        {company.projectList?.map((p: ProjectType) => {
          return (
            <li key={p.id} className="project-list__item">
              <Link
                state={{ from: location }}
                to={String(p.id)}
                className="project-list__link"
              >
                <h2 className="project-list__name"> {p.name} </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
});

export default ProjectsListPage;
