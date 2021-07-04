import http from "../http-common";

class UserService {
  save(user) {
    return http.post("/", user);
  }

  update(username, user) {
    return http.put(`/${username}`, user);
  }
  get(username) {
    return http.get(`/${username}`);
  }

  getPublicAccounts() {
    return http.get(`/public`);
  }

  checkIfPublic(username) {
    return http.get(`/${username}/isPublic`);
  }

  getFollowers(username) {
    return http.get(`/${username}/followers`);
  }

  getFollowing(username) {
    return http.get(`/${username}/following`);
  }
  getFavorites(username) {
    return http.get(`/${username}/favorites`);
  }
  checkUserFollows(username, userToFollow) {
    return http.get(`/${username}/checkFollows/${userToFollow}`);
  }

  getRequests(username) {
    return http.get(`/${username}/requests`);
  }

  setPublic(username) {
    return http.post(`/${username}/setPublic`);
  }

  setPrivate(username) {
    return http.post(`/${username}/setPrivate`);
  }

  follow(username, toFollow) {
    return http.post(`/${username}/follow//${toFollow}`);
  }
  favourites(username, postId) {
    return http.post(`/${username}/favorites/${postId}`);
  }
  accept(username, toFollow) {
    return http.post(`/${username}/accept//${toFollow}`);
  }
}

export default new UserService();
