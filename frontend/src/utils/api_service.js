import axios from "axios";
import { BASE_URL } from "./config";
import { getLocal } from "./helper";

const authenticateUser = async (data) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/auth/login`,
            data
        )
        return response.data;
    } catch (error) {
        alert(error.response.data.message)
    }
}

const getTickets = async () => {
    const token = JSON.parse(getLocal("token"));
    const headers = {
        Authorization: `Bearer ${token.access}`,
    }
    try {
        const response = await axios.get(`${BASE_URL}/tickets/`, {headers});
        return response.data;
    } catch (error) {
        alert(error.response.data.message)
    }
}

export { authenticateUser, getTickets }