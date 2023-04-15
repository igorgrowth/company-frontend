import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { observer } from "mobx-react-lite";
import company from "../../utils/stores/company";
import Loader from "../../components/Loader/Loader";
import { EmployeeType } from "../../utils/types/employee";
import "./EmployeeListPage.scss";

const EmployeeListPage: React.FC = observer(() => {
  const location = useLocation();

  const getEmployees = async (page: number) => {
    try {
      company.setIsLoading(true);
      await company.fetchEmployees(page);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployees(0);
  }, []);

  return (
    <>
      {company.isLoading && <Loader />}
      <ul className="employee-list">
        {company.employeeList?.map((e: EmployeeType) => {
          return (
            <li key={e.id} className="employee-list__item">
              <Link
                state={{ from: location }}
                to={String(e.id)}
                className="employee-list__link"
              >
                <h2 className="employee-list__fullname">
                  {e?.firstName + " " + e?.lastName}
                  <p className="employee-list__position">{e?.position}</p>
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
});

export default EmployeeListPage;
