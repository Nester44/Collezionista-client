import API from "./api"

class UserAPI {
  async getUser(id) {
    const response = await API.get(`/users/${id}`)
    return response
  }
  async makeAdmin(id) {
    const response = await API.put(`/users/makeAdmin/${id}`)
    return response
  }
  async removeAdmin(id) {
    const response = await API.put(`/users/removeAdmin/${id}`)
    return response
  }
  async block(id) {
    const response = await API.put(`/users/block/${id}`)
    return response
  }
  async unblock(id) {
    const response = await API.put(`/users/unblock/${id}`)
    return response
  }
  async delete(id) {
    const response = await API.put(`/users/delete/${id}`)
    return response
  }

}

export default new UserAPI()