import { api } from '../utils/api'

export const userService = {
  // GET /api/v1/users/id/{id}
  getById: (id) => api.get(`/users/id/${id}`),

  // GET /api/v1/users/email/{emailId}
  getByEmail: (email) => api.get(`/users/email/${encodeURIComponent(email)}`),

  // GET /api/v1/users/username/{username}
  getByUsername: (username) => api.get(`/users/username/${username}`),

  // GET /api/v1/users/check/username/{username} → boolean
  checkUsername: (username) => api.get(`/users/check/username/${username}`),

  // PUT /api/v1/users/{id}/role/{role} → UserDto
  updateRole: (id, role) => api.put(`/users/${id}/role/${role}`),
}
