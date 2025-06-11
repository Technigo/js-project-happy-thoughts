import { create } from "zustand"

export const useAuthStore = create((set) => ({
  user: "",
  email: "",
  password: "",

  login: async () => {
    try {
      const user = await fetch()
    } catch (err) {

    }
  }
})
)