import { api } from '../utils/api'

// GET /api/v1/exercises?name=&type=&muscle-group=&page=&size=
export const exerciseService = {
  getAll: ({ name = '', type = '', muscleGroup = '', page = 0, size = 100 } = {}) => {
    const params = new URLSearchParams({ page, size })
    if (name)        params.set('name', name)
    if (type)        params.set('type', type)
    if (muscleGroup) params.set('muscle-group', muscleGroup)
    return api.get(`/exercises?${params}`)
  },
}
