import API from "./api"

class ItemAPI {
  async create(collection_id, name, tags, attributes) {
    const response = await API.post('/items/new', { collection_id, name, tags, attributes })
    return response
  }

  async delete(id) {
    const response = await API.delete(`/items/${id}`)
    return response
  }

  async getTags() {
    const response = await API.get('/items/tags/all')
    return response
  }
}

export default new ItemAPI()