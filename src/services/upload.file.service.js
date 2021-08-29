import axios from "axios";

const API_URL = "http://localhost:5000"

const uploadExcel = (body) => {
    return axios.post(API_URL + "/order/upload", body);
}

const expFunctions = {
    uploadExcel,
}

export default expFunctions;