import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const create = newObject => {
    axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    axios.put(`${baseUrl}/${id}`, newObject)
}

const delet = id => {
    // axios.delete(`${baseUrl}/${id}`)
    return axios.delete(`${baseUrl}/${id}`).then(response => response.data)
}

export default {getAll, create, update, delet} 