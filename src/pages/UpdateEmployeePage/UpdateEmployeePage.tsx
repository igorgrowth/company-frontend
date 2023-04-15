import { Link, Navigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { EmployeeType } from "../../utils/types/employee";
import {
  getEmployeeById,
  updateEmployeeById,
} from "../../utils/services/companyAPI";
import company from "../../utils/stores/company";
import Loader from "../../components/Loader/Loader";
import { Position } from "../../utils/enums/position";
import "./UpdateEmployeePage.scss";

const UpdateEmployeePage: React.FC = observer(() => {
  const [employeeInfo, setEmployeeInfo] = useState<EmployeeType>();
  const { employeeId } = useParams();

  const getEmployeeInfo = async (employeeId: number) => {
    try {
      company.setIsLoading(true);
      const receivedEmployeeInfo: EmployeeType = await getEmployeeById(
        employeeId
      );
      setEmployeeInfo(receivedEmployeeInfo);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  const updateEmployeeInfo = async (employeeId: number, employeeInfo: any) => {
    try {
      company.setIsLoading(true);
      const response = await updateEmployeeById(employeeId, employeeInfo);
      console.log(response);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  useEffect(() => {
    getEmployeeInfo(Number(employeeId));
  }, [employeeId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEmployeeInfo((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateEmployeeInfo(Number(employeeId), employeeInfo);
    company.cleanEmployeeList();
  };

  return (
    <>
      <Link className="employee__go-back" to={"/employees"}>
        CANCEL
      </Link>

      {company.isLoading && <Loader />}

      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={employeeInfo?.firstName}
          onChange={handleChange}
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={employeeInfo?.lastName}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={employeeInfo?.email}
          onChange={handleChange}
        />
        <label htmlFor="position">Position:</label>
        <select
          className=""
          id="position"
          name="position"
          value={employeeInfo?.position}
          onChange={handleChange}
        >
          <option value={Position.FRONTEND}>frontend</option>
          <option value={Position.BACKEND}>backend</option>
          <option value={Position.DEVOPS}>devops</option>
          <option value={Position.MANAGER}>manager</option>
          <option value={Position.HR}>HR</option>
        </select>

        <button type="submit">Update</button>
      </form>
    </>
  );
});

export default UpdateEmployeePage;
