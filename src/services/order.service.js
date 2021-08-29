import axios from "axios";

const API_URL = "http://localhost:5000"

const getOrders = (params="") => {
    return axios.get(API_URL + "/order" + params);
}

const getOrderById = (id) => {
    return axios.get(API_URL + "/order/" + id);
}

const getOrderFileter = (params) => {
    return axios.get(API_URL + '/order/search' + params);
}
const expFunctions = {
    getOrders,
    getOrderById,
    getOrderFileter
}

export default expFunctions;