import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
})

const publicAPI = axios.create({
  baseURL: 'https://run.mocky.io/v3/2d06d2c1-5a77-4ecd-843a-53247bcb0b94',
  timeout: 5000,
})

export { API, publicAPI }
