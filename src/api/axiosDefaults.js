import axios from "axios"

axios.defaults.baseURL = "https://whereto-backend-2f21048c299f.herokuapp.com";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true