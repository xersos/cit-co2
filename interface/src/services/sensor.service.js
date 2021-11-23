import http from "../http-common";
import authHeader from './auth-header';

class SensorDataService {
  getAll() {
    return http.get("/sensors" , { headers: authHeader() });
  }

  get(id) {
    return http.get(`/sensors/${id}` , { headers: authHeader() });
  }

  create(data) {
    return http.post("/sensors", data , { headers: authHeader() });
  }

  update(id, data) {
    return http.put(`/sensors/${id}`, data , { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/sensors/${id}` , { headers: authHeader() });
  }

}

export default new SensorDataService();