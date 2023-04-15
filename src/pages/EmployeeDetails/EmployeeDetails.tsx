import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import company from "../../stores/company";
import { EmployeeType } from "../../types/employee";
import { getEmployeeById } from "../../services/companyAPI";
import "./EmployeeDetails.scss";
import Loader from "../../components/Loader/Loader";
import { observer } from "mobx-react-lite";

const EmployeeDetails: React.FC = observer(() => {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeType | undefined>(
    undefined
  );
  const location = useLocation();
  const { employeeId } = useParams();

  const getEmployeeInfo = async (employeeId: number) => {
    company.setIsLoading(true);

    try {
      const receivedEmployeeInfo: EmployeeType | undefined =
        await getEmployeeById(employeeId);
      setEmployeeInfo(receivedEmployeeInfo);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeInfo(Number(employeeId));
  }, []);

  return (
    <>
      <Link className="employee__go-back" to={location?.state?.from ?? "/"}>
        GO BACK
      </Link>

      {company.isLoading && <Loader />}

      <div className="employee">
        <h2 className="employee__fullname">
          {employeeInfo?.firstName + " " + employeeInfo?.lastName}
        </h2>
        <p className="employee__email">{employeeInfo?.email || "not known"} </p>
        <p className="employee__position">
          {employeeInfo?.position || "not known"}
        </p>
        {/* <p className="employee__projects"> {employeeInfo?.project} </p> */}
      </div>
    </>
  );
});

export default EmployeeDetails;
