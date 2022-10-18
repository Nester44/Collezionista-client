import API from "./api"

const renameFile = (originalFile, newName) => {
  const blob = originalFile.slice(0, originalFile.size, originalFile.type)
  return new File([blob], newName, { type: originalFile.type, lastModified: originalFile.lastModified })
}

class CollectionAPI {
  async create(user_id, name, description, topic, image) {
    const formData = new FormData()
    formData.append('user_id', user_id)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('topic', topic)

    if (image) {
      const imageFile = renameFile(image, `${user_id}AND${name}AND${topic}`)
      formData.append('imgfile', imageFile)
    }
    const response = await API.post('/collections/new', formData)
    return response;
  }

  async delete(id) {
    const response = await API.delete(`/collections/${id}`)
    return response;
  }

  async getCollection(id) {
    const response = await API.get(`/collections/${id}`)
    return response;
  }

  async editDescription(id, description) {
    const response = await API.put('/collections/edit/description', { id, description })
    return response;
  }

  async updateCollection(collection) {
    const response = await API.put('/collections/edit/', { collection })
    return response;
  }
}

export default new CollectionAPI()