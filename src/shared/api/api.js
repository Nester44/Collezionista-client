import axios from 'axios'

const AZURE_BASE_URL = 'https://collectionmanagementnodejs.azurewebsites.net'
const LOCALHOST_BASE_URL = 'http://localhost:1337'

const API = axios.create({
  baseURL: LOCALHOST_BASE_URL,
  withCredentials: true,
  crossDomain: true
})

export const getUser = async (id) => {
  const response = await API.get(`/users/${id}`)

  return (response)
}

export default API