import http from "../http-camp";

class CampaignService {
  save(post) {
    return http.post("/campaign/", post);
  }
  delete(post) {
    return http.delete(`/campaign/${post}`);
  }
  findByUsername(username) {
    return http.get(`/campaign/${username}`);
  }
  findById(id) {
    return http.get(`/campaign/id/${id}`);
  }
  myCampaign(id) {
    return http.get(`/campaign/${id}/mycampaign`);
  }

  saveAgent(post) {
    return http.post("/agent/", post);
  }
  requests() {
    return http.get(`/agent/requests`);
  }
  agents() {
    return http.get(`/agent/agents`);
  }
  approveAgent(id) {
    return http.post(`/agent/approve/${id}`);
  }
}

export default new CampaignService();
