import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { storage } from './storage'

type User = {
  id: string
  name: string
  photos: string[]
}

type AuthState = {
  user: User | null
  token: string | null
  hasOnboarded: boolean
  isHydrated: boolean

  setHydrated: (v: boolean) => void
  setAuth: (
    user: User,
    token: string,
    hasOnboarded: boolean
  ) => void
  logout: () => void
  completeOnboarding: () => void
}


export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      hasOnboarded: false,
      isHydrated: false,

      setHydrated: (v) => set({ isHydrated: v }),

      setAuth: (user, token, hasOnboarded) =>
        set({
          user,
          token,
          hasOnboarded,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
          hasOnboarded: false,
        }),

      completeOnboarding: () =>
        set({
          hasOnboarded: true,
        }),
    }),
    {
      name: 'auth-storage',

      storage: createJSONStorage(() => storage),

      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true)
      },
    }
  )
)