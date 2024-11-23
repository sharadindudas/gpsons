import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://dev-api.gourangapaul.com",
});
