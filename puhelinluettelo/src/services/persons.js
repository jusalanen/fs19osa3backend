import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getOne = id => {
  const request = axios.get(baseUrl.concat('/', String(id)))
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const remove = id => {
  const strDel = baseUrl.concat('/', String(id))
  return axios.delete(strDel)
}

const update = (id, newObject) => {
  const request = axios.put(baseUrl.concat('/', String(id)), newObject)
  return request.then(response => response.data)
}

export default { getAll, getOne, create, remove, update }