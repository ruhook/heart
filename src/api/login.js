import { login } from './merge'
import axios from './ajax'

export function toLogin(options) {
  return axios(axios,{
    ...options
  })
}