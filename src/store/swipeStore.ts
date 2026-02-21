import { create } from 'zustand'

type SwipeState = {
  currentIndex: number
  isSwiping: boolean

  increment: () => void
  reset: () => void
  setSwiping: (val: boolean) => void
}

export const useSwipeStore = create<SwipeState>((set) => ({
  currentIndex: 0,
  isSwiping: false,

  increment: () =>
    set((state) => ({
      currentIndex: state.currentIndex + 1,
    })),

  reset: () =>
    set({
      currentIndex: 0,
    }),

  setSwiping: (val) =>
    set({
      isSwiping: val,
    }),
}))
