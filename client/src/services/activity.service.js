import http from "../http-common";

class ActivityDataService {
  getAll() {
    return http.get("/activities");
  }

  get(id) {
    return http.get(`/activities/${id}`);
  }

  create(data) {
    return http.post("/activities", data);
  }

  update(id, data) {
    return http.put(`/activities/${id}`, data);
  }

  delete(id) {
    return http.delete(`/activities/${id}`);
  }

  deleteAll() {
    return http.delete(`/activities`);
  }

  findByTitle(title) {
    return http.get(`/activities?title=${title}`);
  }
}

export default new ActivityDataService();