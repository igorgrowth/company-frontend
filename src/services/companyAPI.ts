import axios, { AxiosInstance } from "axios";

export const companyService: AxiosInstance = axios.create({
  baseURL: "http://localhost:8080/api/",
  params: {
    pageSize: 10,
  },
});

// export const getEmployees = async (page: number) => {
//   const { data } = await companyService.get("employee", {
//     params: { page },
//   });
//   return data.content;
// };

// export const getProjects = async (page: number) => {
//   const { data } = await companyService.get("project", {
//     params: { page },
//   });
//   return data.content;
// };

export const getEmployeeById = async (id: number) => {
  const { data } = await companyService.get(`employee/${id}`);
  return data;
};

export const getProjectById = async (id: number) => {
  const { data } = await companyService.get(`project/${id}`);
  return data;
};
