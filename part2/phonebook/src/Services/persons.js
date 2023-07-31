import axios from 'axios'
const baseUrl = '/api/persons'
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then((response) => response.data)
}
const deleteRequest = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then((response) => response.data)
}
const update = (id, newNumber) =>
  axios.put(`${baseUrl}/${id}`, newNumber).then((response) => response.data)
export default { getAll, create, deleteRequest, update }
