import API from "./api"

class ItemAPI {
  async delete(id) {
    const response = await API.delete(`/items/${id}`)
    return response
  }
}

export default new ItemAPI()