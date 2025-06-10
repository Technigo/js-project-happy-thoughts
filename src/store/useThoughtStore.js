import { create } from "zustand";
import { API_URL } from "../utils/constants";

export const useThoughtStore = create((set) => ({
  thoughts: [],
  loading: false,
  error: null,

  fetchThoughts: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(API_URL)
      const data = await response.json()
      set({ thoughts: data.response, loading: false })
    } catch (error) {
      console.error(error)
      set({ loading: false, error: error })
    }
  },

  addThought: (newThought) => set((state) => ({
    thoughts: [newThought, ...state.thoughts]
  })),

  deleteThought: async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "delete"
      })
      if (!response.ok) {
        throw new Error("Thought not deleted")
      }
      set((state) => ({
        thoughts: state.thoughts.filter(t => t._id !== id)
      }))
    } catch(error) {
        console.error(error)
    }
  },

  editThought: async (id, newMessage) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "patch",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ editThought: newMessage })
      })
      const data = await response.json()
      set((state) => ({
        thoughts: state.thoughts.map(t => t._id === id ? data.response : t )
      }))
    } catch(error) {
        console.error(error)
    }
  }
})
)