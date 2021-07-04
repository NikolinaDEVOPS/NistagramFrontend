import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9004/campaign",
  headers: {
    "Content-type": "application/json"
  }
});
