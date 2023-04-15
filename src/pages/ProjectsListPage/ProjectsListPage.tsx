import { Link, useLocation } from "react-router-dom";
import { ProjectType } from "../../types/project";
import { useEffect } from "react";
import company from "../../stores/company";
import { observer } from "mobx-react-lite";
import "./ProjectsListPage.scss";
import Loader from "../../components/Loader/Loader";

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
