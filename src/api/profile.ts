import { api } from './client'

export const fetchMyProfile = async () => {
  const response = await api.get('/profiles/me/')
  return response.data
}

export const updateProfile = async (data: Record<string, unknown>) => {
  const response = await api.put('/profiles/me/', data)
  return response.data
}
