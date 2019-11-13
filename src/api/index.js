import {post} from './request';

const baseUrl = '';

export function menu(obj = {}) {
  return post(`${baseUrl}/login/login.json`, obj)
}
