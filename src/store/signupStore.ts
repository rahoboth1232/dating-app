import { create } from 'zustand'

type SignupState = {
  email: string
  username: string
  password: string
  confirm_password: string
  bio: string
  age: string
  gender: string
  interested_in: string
  interests: string[]
  photo: any | null

  setField: <K extends keyof SignupState>(
    key: K,
    value: SignupState[K]
  ) => void

  reset: () => void
}

export const useSignupStore = create<SignupState>((set) => ({
  email: '',
  username: '',
  password: '',
  confirm_password: '',
  bio: '',
  age: '',
  gender: '',
  interested_in: '',
  interests: [],
  photo: null,

  setField: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),

  reset: () =>
    set({
      email: '',
      username: '',
      password: '',
      confirm_password: '',
      bio: '',
      age: '',
      gender: '',
      interested_in: '',
      interests: [],
      photo: null,
    }),
}))
