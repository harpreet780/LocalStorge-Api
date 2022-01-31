import axios from "axios"
export const HttpsReq = axios.create({
    baseURL: "http://localhost:4000/"
}
)