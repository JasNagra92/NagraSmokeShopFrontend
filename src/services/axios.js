import axios from "axios";

let APP_ENVIRONMENT = "local";

export let BASE_ENDPOINT = "";

if (APP_ENVIRONMENT === "local") {
  BASE_ENDPOINT = "http://localhost:4000";
} else if (APP_ENVIRONMENT === "dev") {
  BASE_ENDPOINT = "https://api.dev.nagrasmokeserver.cloud";
} else if (APP_ENVIRONMENT === "staging") {
  BASE_ENDPOINT = "https://api.stg.nagrasmokeserver.cloud";
} else if (APP_ENVIRONMENT === "production") {
  BASE_ENDPOINT = "https://api.nagrasmokeserver.cloud";
}

const BASE_URL = `${BASE_ENDPOINT}/api/v1`;

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
});
