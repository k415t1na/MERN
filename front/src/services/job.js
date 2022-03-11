
import axios from "axios"
import base_url from "./utils"

const get_token = () => {
    const token = window.localStorage.getItem('token')
    return `bearer ${token}`
}

export const add_job = async (payload) => {
    const config = {
        headers: { authorization: get_token()},
    }
    const {data} = await axios.post(`${base_url}/jobs`, payload, config)
    return data
}


export const get_jobs = async () => {
    const config = {
        headers: { authorization: get_token()},
    }
    const {data} = await axios.get(`${base_url}/jobs`, config)
    return data
}

export const get_job_detail = async (id) => {
    const config = {
        headers: { authorization: get_token()},
    }
    const {data} = await axios.get(`${base_url}/jobs/${id}`, config)
    return data
}

export const delete_job = async (job_id) => {
    const config = {
        headers: { authorization: get_token()},
    }
    const {data} = await axios.delete(`${base_url}/jobs/${job_id}`, config)
    return data
}

export const punch_in = async (job_id) => {
    const config = {
        headers: { authorization: get_token()},
    }
    const {data} = await axios.post(`${base_url}/punch-in/${job_id}`, {}, config)
    return data
}

export const punch_out = async (job_id) => {
    const config = {
        headers: { authorization: get_token()},
    }
    const {data} = await axios.patch(`${base_url}/punch-out/${job_id}`, {}, config)
    return data
}
