import API from "./api"

class AuthAPI {
  async loginUser(password, email) {
    const response = await API.post('/auth/login', { password, email })
    return response
  }

  async checkAuth() {
    const response = await API.get('/auth/checkAuth')
    return response
  }

  async register(password, email, name) {
    const response = await API.post('/users/new', { password, email, name })
    return response
  }

  async logout() {
    const response = await API.delete('/auth/logout')
    return response
  }
}

export default new AuthAPI()