import { api } from '../utils/api'

export const assignmentService = {
  // GET /api/v1/workout-assignments?student={uuid}&page=&size=
  getByStudent: (studentId, { page = 0, size = 20 } = {}) =>
    api.get(`/workout-assignments?student=${studentId}&page=${page}&size=${size}`),

  // GET /api/v1/workout-assignments/{id}
  getById: (id) => api.get(`/workout-assignments/${id}`),

  // GET /api/v1/workout-assignments/{id}/exercises (paged)
  getExercises: (id, { page = 0, size = 50 } = {}) =>
    api.get(`/workout-assignments/${id}/exercises?page=${page}&size=${size}`),

  // POST /api/v1/workout-assignments
  create: (body) => api.post('/workout-assignments', body),

  // PUT /api/v1/workout-assignments/{id}/status?status=
  updateStatus: (id, status) =>
    api.put(`/workout-assignments/${id}/status?status=${status}`),
}
