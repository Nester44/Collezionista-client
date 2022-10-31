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

  async get(item_id, user_id) {
    const response = await API.get(`/items/get/${item_id}/${user_id}`)
    return response
  }

  async update(id, name, tags, attributes) {
    const response = await API.put('/items/update', { id, name, tags, attributes })
    return response
  }

  async like(item_id, user_id) {
    const response = await API.post('/items/like', { item_id, user_id })
    return response
  }

  async dislike(item_id, user_id) {
    const response = await API.post('/items/dislike', { item_id, user_id })
    return response
  }

  async getRecentItems() {
    const response = await API.get('/items/latest')
    return response
  }

  async getItemsByTag(tag) {
    const response = await API.get(`/items/tag/${tag}`)
    return response
  }

  async getItemsByQuery(value) {
    const response = await API.get(`/items/search/${value}`)
    return response
  }

}

export default new ItemAPI()