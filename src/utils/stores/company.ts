import { makeAutoObservable, configure } from "mobx";
import { EmployeeType } from "../types/employee";
import { ProjectType } from "../types/project";
import { Position } from "../enums/position";
import { companyService } from "../services/companyAPI";
import { AxiosResponse } from "axios";

configure({ enforceActions: "observed" });

class Company {
  token: boolean = true;
  // token: boolean = false;

  isLoading: boolean = false;
  error: string = "";

  admin: any = null;

  employeeList: Array<EmployeeType> = [];
  projectList: Array<ProjectType> = [];

  totalEmployees: number = 0;
  totalProjects: number = 0;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  cleanEmployeeList() {
    this.employeeList = [];
  }

  cleanProjectList() {
    this.projectList = [];
  }

  setToken(set: boolean): void {
    this.token = set;
  }

  setError(set: string): void {
    this.error = set;
  }

  setIsLoading(set: boolean): void {
    this.isLoading = set;
  }

  addEmployee(
    id: string | number,
    firstName: string,
    lastName: string,
    email: string,
    position: Position,
    project: Array<ProjectType>
  ): EmployeeType {
    return { id, firstName, lastName, email, position, project };
  }

  addProject(
    id: string | number,
    name: string,
    employeeList: Array<EmployeeType>
  ): ProjectType {
    return { id, name, employeeList };
  }

  async fetchEmployees(page: number) {
    const { data }: AxiosResponse = await companyService.get("employee", {
      params: { page },
    });

    const employees: Array<EmployeeType> = [];
    for (let i = 0; i < data.content.length; i++) {
      if (!this.employeeList.some((el) => el.id === data.content[i].id)) {
        employees.push(data.content[i]);
      }
    }
    this.employeeList = [...this.employeeList, ...employees];
    this.totalEmployees = data.totalElements;
    console.log("FETCH EMPLOYEES ", data.content);
  }

  async fetchProjects(page: number) {
    const { data }: AxiosResponse = await companyService.get("project", {
      params: { page },
    });
    const projects: Array<ProjectType> = [];
    for (let i = 0; i < data.length; i++) {
      if (!this.projectList.some((el) => el.id === data[i].id)) {
        projects.push(data[i]);
      }
    }
    this.projectList = [...this.projectList, ...projects];
    console.log("FETCH PROJECTS ", data);
  }
}

export default new Company();