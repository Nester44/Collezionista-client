import axios from 'axios'

const API = axios.create({
  baseURL: 'https://collectionmanagementnodejs.azurewebsites.net',
  withCredentials: true,
  crossDomain: true
})

export const getUser = async (id) => {
  const response = await API.get(`/users/${id}`)

  return (response)
}

export default API