import axios from "axios";
import { BASE_URL } from "./config";

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

export { authenticateUser }