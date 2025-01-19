import { request } from "@/apiRequest/request";
import { Topic } from "@/types/topic";

export const apiTopic = {
  findAll: (params?: {
    keyword?: string;
    page?: number;
    limit?: number;
  }) => request.get("http://localhost:8080/topics", {
    params
  }),
  findOne: (id: string) => request.get(`http://localhost:8080/topics/${id}`),
  create: (data: Omit<Topic, 'id' | 'created_at' | 'updated_at'>) => request.post("http://localhost:8080/topics", data),
  update: (id: string, data: Omit<Topic, 'id' | 'created_at' | 'updated_at'>) => request.put(`http://localhost:8080/topics/${id}`, data),
}