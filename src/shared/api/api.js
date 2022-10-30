import axios from 'axios'

const AZURE_BASE_URL = 'https://collection-sys.azurewebsites.net/'
const LOCALHOST_BASE_URL = 'http://localhost:1337'

const API = axios.create({
  baseURL: LOCALHOST_BASE_URL,
  withCredentials: true,
  crossDomain: true
})

export default API