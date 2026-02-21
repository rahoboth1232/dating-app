import { useMutation } from '@tanstack/react-query'
import { register } from '../src/api/auth.api'
import { useAuthStore } from '@/src/store/authStore'

export const useRegister = () => {
  const setAuth = useAuthStore(s => s.setAuth)

  return useMutation({
    mutationFn: register,

    onSuccess: (data) => {
      setAuth(
        data.data.user,
        data.data.token,
        data.data.hasOnboarded ?? false
      )
    },

    onError: (error: any) => {
      console.log("Register error:", JSON.stringify(error.response?.data)) // 👈 add this
    },
  })
}
