import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { EmployeeType } from "../../utils/types/employee";
import company from "../../utils/stores/company";
import { addEpmloyee } from "../../utils/services/companyAPI";
import { Position } from "../../utils/enums/position";
import "./AddEmployeeFormPage.scss";

const AddEmployeeFormPage: React.FC = observer(() => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    position: Position,
    project: "",
  });

  const addNewEmployee = async (formData: any): Promise<void> => {
    try {
      company.setIsLoading(true);
      const response = await addEpmloyee(formData);
      console.log(response);
    } catch (error: any) {
      company.setError(error.message);
    } finally {
      company.setIsLoading(false);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    addNewEmployee(formData);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form className="add-employee-form" onSubmit={handleSubmit}>
      <label>
        name:
        <input
          className="add-employee-form__firstname"
          autoComplete="off"
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        surname:
        <input
          className="add-employee-form__lastname"
          autoComplete="off"
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        email:
        <input
          className="add-employee-form__email"
          autoComplete="off"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </label>
      <label>
        project:
        <input
          className="add-employee-form__project"
          autoComplete="off"
          type="text"
          name="project"
          value={formData.project}
          onChange={handleInputChange}
        />
      </label>

      <label>
        subscription type:
        <select
          className="add-employee-form__position"
          name="position"
          onChange={handleInputChange}
        >
          <option value={Position.FRONTEND}> FRONTEND</option>
          <option value={Position.BACKEND}> BACKEND</option>
          <option value={Position.DEVOPS}> DEVOPS</option>
          <option value={Position.MANAGER}> MANAGER</option>
          <option value={Position.HR}> HR</option>
        </select>
      </label>
      <button className="form__btn" type="submit">
        Submit
      </button>
    </form>
  );
});

export default AddEmployeeFormPage;
