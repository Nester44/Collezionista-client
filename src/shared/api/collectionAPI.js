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
    debugger;
    const response = await API.post('/collections/new', formData)
    return response;
  }

  async delete(collection_id) {
    const response = await API.delete(`/collections/${collection_id}`)
    return response;
  }
}

export default new CollectionAPI()