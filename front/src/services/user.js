
import axios from "axios"
import base_url from "./utils"

const get_token = () => {
    const token = window.localStorage.getItem('token')
    return `bearer ${token}`
}

export const handle_login = async (payload) => {
    const {data} = await axios.post(`${base_url}/login`, payload)
    return data
}

export const handle_register = async (payload) => {
    const {data} = await axios.post(`${base_url}/users`, payload)
    return data
}

export const get_users_list = async () => {
    const {data} = await axios.get(`${base_url}/users`)
    return data
}

export const toggle_role = async (user_id) => {
    const {data} = await axios.patch(`${base_url}/admin/toggle/${user_id}`)
    return data
}
