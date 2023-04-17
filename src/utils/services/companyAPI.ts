import axios, { AxiosInstance, AxiosResponse } from "axios";
import { EmployeeType } from "../types/employee";

export const companyService: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  params: {
    pageSize: 10,
  },
});

export const getEmployeeById = async (id: number) => {
  const { data }: AxiosResponse = await companyService.get(`employee/${id}`);
  return data;
};

export const updateEmployeeById = async (
  id: number,
  employee: EmployeeType
) => {
  const response: AxiosResponse = await companyService.put(
    `employee/${id}`,
    employee
  );
  return response;
};

export const deleteEmployeeById = async (id: number) => {
  const response: AxiosResponse = await companyService.delete(`employee/${id}`);
  return response;
};

export const addEpmloyee = async (employee: any) => {
    console.log(employee);

  const response: AxiosResponse = await companyService.post(
    "employee",
    employee
  );
  return response;
};

export const getProjectById = async (id: number) => {
  const { data }: AxiosResponse = await companyService.get(`project/${id}`);
  return data;
};
