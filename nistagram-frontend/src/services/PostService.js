import http from "../http-post";

class PostService {
  save(post) {
    return http.post("/", post);
  }
  getPublic() {
    return http.get(`/public`);
  }
  search(tag) {
    return http.get(`/search/${tag}`);
  }
  findByUsername(username) {
    return http.get(`/${username}`);
  }
  findByPostId(id) {
    return http.get(`/id/${id}`);
  }

  like(username, postId) {
    return http.post(`/${username}/like/${postId}`);
  }
  dislike(username, postId) {
    return http.post(`/${username}/dislike/${postId}`);
  }
  comment(username, postId, content) {
    return http.post(`/${username}/comment/${postId}`, content);
  }
}

export default new PostService();
