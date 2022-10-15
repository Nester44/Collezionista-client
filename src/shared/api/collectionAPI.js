import API from "./api"

class CollectionAPI {
  async create(user_id, name, description, topic) {
    const response = await API.post('/collections/new', { user_id, name, description, topic })
    debugger;
    return response;
  }
}

export default new CollectionAPI()