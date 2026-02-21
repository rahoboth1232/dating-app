import { useAuthStore } from '@/src/store'
import { shallow } from 'zustand/shallow'

export const useAuth = () => {
  const { user, token, hasOnboarded, isHydrated } =
    useAuthStore(
      s => ({
        user: s.user,
        token: s.token,
        hasOnboarded: s.hasOnboarded,
        isHydrated: s.isHydrated,
      }),
      shallow
    )

  return {
    user,
    token,
    isLoggedIn: !!token,
    hasOnboarded,
    isHydrated,
  }
}
