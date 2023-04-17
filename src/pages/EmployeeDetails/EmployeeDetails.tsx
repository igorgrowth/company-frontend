import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { EmployeeType } from "../../utils/types/employee";
import {
  deleteEmployeeById,
  getEmployeeById,
} from "../../utils/services/companyAPI";
import Loader from "../../components/Loader/Loader";
import company from "../../utils/stores/company";
import "./EmployeeDetails.scss";

const EmployeeDetails: React.FC = observer(() => {
  const navigate = useNavigate();
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeType | undefined>(
    undefined
  );
  const location = useLocation();
  const { employeeId } = useParams();

  const getEmployeeInfo = async (employeeId: number) => {
    try {
      company.setIsLoading(true);
      const receivedEmployeeInfo: EmployeeType | undefined =
        await getEmployeeById(employeeId);
      setEmployeeInfo(receivedEmployeeInfo);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  const deleteEmployee = async (employeeId: number) => {
    try {
      company.setIsLoading(true);
      const response = await deleteEmployeeById(employeeId);
      console.log(response);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getEmployeeInfo(Number(employeeId));
    console.log(employeeId);
  }, [employeeId]);

  return (
    <>
      <Link className="employee__go-back" to={location?.state?.from ?? "/"}>
        GO BACK
      </Link>

      {company.isLoading && <Loader />}

      <div className="employee">
        <h2 className="employee__fullname">
          {employeeInfo?.firstName + " " + employeeInfo?.lastName ||
            "not known"}
        </h2>
        <p className="employee__email">{employeeInfo?.email || "not known"} </p>
        <p className="employee__position">
          {employeeInfo?.position || "not known"}
        </p>
        <p className="employee__projects">
          {employeeInfo?.project?.name || "not yet assigned"}
        </p>
      </div>

      <Link className="employee__update" to={"updateemp"}>
        UPDATE
      </Link>

      <button
        className="employee__delete"
        type="submit"
        onClick={() => {
          deleteEmployee(Number(employeeId));
        }}
      >
        DELETE
      </button>
    </>
  );
});

export default EmployeeDetails;
