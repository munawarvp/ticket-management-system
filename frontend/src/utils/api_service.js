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

const getTickets = async (status, priority) => {
    const token = JSON.parse(getLocal("token"));
    const headers = {
        Authorization: `Bearer ${token.access}`,
    }
    try {
        const response = await axios.get(`${BASE_URL}/api/tickets?status=${status}&priority=${priority}`, {headers});
        return response.data;
    } catch (error) {
        alert(error.response.data.message)
    }
}

const getAdminTickets = async (status, priority) => {
    const token = JSON.parse(getLocal("token"));
    const headers = {
        Authorization: `Bearer ${token.access}`,
    }
    try {
        const response = await axios.get(`${BASE_URL}/api/admin?status=${status}&priority=${priority}`, {headers});
        return response.data;
    } catch (error) {
        alert(error.response.data.message)
    }
}

const createTicket = async (data) => {
    const token = JSON.parse(getLocal("token"));
    const headers = {
        Authorization: `Bearer ${token.access}`,
    }
    try {
        const response = await axios.post(`${BASE_URL}/api/tickets`, data, {headers});
        return response.data;
    } catch (error) {
        alert(error.response.data.message)
    }
}

const deleteTicket = async (id) => {
    const token = JSON.parse(getLocal("token"));
    const headers = {
        Authorization: `Bearer ${token.access}`,
    }
    try {
        const response = await axios.delete(`${BASE_URL}/api/tickets?ticket_id=${id}`, {headers});
        return response.data;
    } catch (error) {
        alert(error.response.data.message)
    }
}

export { authenticateUser, getTickets, createTicket, getAdminTickets, deleteTicket }