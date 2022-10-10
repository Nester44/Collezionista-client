import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:1337',
  withCredentials: true
})

export const getUser = async (id) => {
  const response = await API.get(`/users/${id}`)

  return (response)
}

export default API