import { useQuery } from '@tanstack/react-query'

import { fetchMyProfile } from '@/src/api/profile'
import { useAuthStore } from '@/src/store'

export const useProfile = () => {
  const token = useAuthStore(s => s.token)

  return useQuery({
    queryKey: ['my-profile'],
    queryFn: fetchMyProfile,
    enabled: !!token, // 🔥 only fetch when logged in
  })
}
