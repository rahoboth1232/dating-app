import { create } from 'zustand'

type UIState = {
  isMatchModalOpen: boolean
  selectedFilter: string | null

  openMatchModal: () => void
  closeMatchModal: () => void
  setFilter: (filter: string | null) => void
}

export const useUIStore = create<UIState>((set) => ({
  isMatchModalOpen: false,
  selectedFilter: null,

  openMatchModal: () =>
    set({
      isMatchModalOpen: true,
    }),

  closeMatchModal: () =>
    set({
      isMatchModalOpen: false,
    }),

  setFilter: (filter) =>
    set({
      selectedFilter: filter,
    }),
}))
