import API from "./api"

class UserAPI {
  async getUser(id) {
    const response = await API.get(`/users/${id}`)
    return (response)
  }

}

export default new UserAPI()