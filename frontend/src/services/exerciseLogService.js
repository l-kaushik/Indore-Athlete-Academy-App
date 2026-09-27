import { api } from '../utils/api'

export const exerciseLogService = {
  // POST /api/v1/{workoutId}/exercise-logs/
  // body: { assignmentExerciseId, setNumber, actualWeight?, duration? }
  create: (workoutId, body) => api.post(`/${workoutId}/exercise-logs/`, body),

  // GET /api/v1/{workoutId}/exercise-logs/?page=&size=
  getByWorkout: (workoutId, { page = 0, size = 50 } = {}) =>
    api.get(`/${workoutId}/exercise-logs/?page=${page}&size=${size}`),
}
