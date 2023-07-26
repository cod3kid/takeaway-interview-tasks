import axios from "axios";
import { API_URL } from "@env";

const instance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
});

export default instance;
