import { api, tokenStore } from '../utils/api'

export const authService = {
  // POST /api/v1/auth/login → TokenResponse
  login: (identifier, password) =>
    api.pub.post('/auth/login', { identifier, password }),

  // POST /api/v1/auth/register → {}
  register: (data) =>
    api.pub.post('/auth/register', data),

  // POST /api/v1/auth/logout
  logout: () =>
    api.post('/auth/logout').catch(() => {}).finally(() => tokenStore.clear()),
}
