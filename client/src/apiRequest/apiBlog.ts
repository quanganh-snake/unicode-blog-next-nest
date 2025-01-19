import { request } from "@/apiRequest/request";
import { TBlogResponse, TFilterBlog } from "@/types/blog";

export const apiBlog = {
  findAll: (params: TFilterBlog) => request.get("http://localhost:8080/blogs", {
    params
  }),
  findOne: (id: string): Promise<TBlogResponse> => request.get(`http://localhost:8080/blogs/${id}`),
  create: (data: any) => request.post("http://localhost:8080/blogs", data),
  update: (id: string, data: any) => request.put(`http://localhost:8080/blogs/${id}`, data),
}