import http from "../http-common";
import authHeader from './auth-header';

class ClassroomDataService {
  getAll() {
    return http.get("/classrooms");
  }

  findByName(name) {
    return http.get(`/classrooms/filter?name=${name}`);
  }

  get(id) {
    return http.get(`/classrooms/${id}`);
  }

  create(data) {
    return http.post("/classrooms", data , { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/classrooms/${id}`, data , { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/classrooms/${id}` , { headers: authHeader() });
  }

}

export default new ClassroomDataService();