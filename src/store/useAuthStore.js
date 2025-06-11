import { create } from "zustand"

export const useAuthStore = create((set) => ({
  username: "",
  email: "",
  password: "",
  accessToken: "",

  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
  setToken: (accessToken) => set({ accessToken }),

  createLogin: async () => {
    const { username, password } = get()

    try {
      const response = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password })
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Login failed")
      }

      set({ accessToken: data.accessToken })
      
    } catch (err) {
      console.error("Login not generated:", err)
    }
  }
})
)