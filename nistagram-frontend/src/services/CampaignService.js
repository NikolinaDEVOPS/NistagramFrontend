import http from "../http-camp";

class CampaignService {
  save(post) {
    return http.post("/", post);
  }
  delete(post) {
    return http.delete(`/${post}`);
  }
  findByUsername(username) {
    return http.get(`/${username}`);
  }
  findById(id) {
    return http.get(`/id/${id}`);
  }
  myCampaign(id) {
    return http.get(`/${id}/mycampaign`);
  }
}

export default new CampaignService();
