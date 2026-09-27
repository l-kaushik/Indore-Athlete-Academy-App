import { api } from '../utils/api'

export const workoutService = {
  // POST /api/v1/workouts/  body: { assignmentId: uuid }
  create: (assignmentId) => api.post('/workouts/', { assignmentId }),

  // GET /api/v1/workouts/{id}
  getById: (id) => api.get(`/workouts/${id}`),

  // GET /api/v1/workouts/recents?page=&size=
  getRecents: ({ page = 0, size = 10 } = {}) =>
    api.get(`/workouts/recents?page=${page}&size=${size}`),

  // PUT /api/v1/workouts/{id}/start
  start: (id) => api.put(`/workouts/${id}/start`),

  // PUT /api/v1/workouts/{id}/end
  end: (id) => api.put(`/workouts/${id}/end`),
}
