import { api } from '../utils/api'

export const templateService = {
  // GET /api/v1/workout-templates/{id}
  getById: (id) => api.get(`/workout-templates/${id}`),

  // GET /api/v1/workout-templates/{id}/exercises (paged)
  getExercises: (id, { page = 0, size = 50 } = {}) =>
    api.get(`/workout-templates/${id}/exercises?page=${page}&size=${size}`),

  // POST /api/v1/workout-templates
  // body: { trainerId, name, description, exercises: [uuid] }
  create: (body) => api.post('/workout-templates', body),

  // PUT /api/v1/workout-templates/{id}
  // body: { name?: string, description?: string }
  update: (id, fields) => api.put(`/workout-templates/${id}`, fields),
}
