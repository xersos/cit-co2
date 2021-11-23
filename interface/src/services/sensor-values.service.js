import http from "../http-common";
import authHeader from './auth-header';

class SensorValuesDataService {
  getAll() {
    return http.get("/sensor-values" , { headers: authHeader() });
  }

  delete(id) {
    return http.delete(`/classrooms/${id}` , { headers: authHeader() });
  }

}

export default new SensorValuesDataService();