const API_BASE_URL = 'https://happy-thoughts-ux7hkzgmwa-uc.a.run.app'

export const api = {
  // Get all thoughts
  getThoughts: async () => {
    const response = await fetch(`${API_BASE_URL}/thoughts`)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return response.json()
  },

  // Post a new thought
  postThought: async (message) => {
    const response = await fetch(`${API_BASE_URL}/thoughts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    })

    if (!response.ok) {
      const data = await response.json().catch(() => ({}))
      throw new Error(
        data.message || `Failed to post thought: ${response.status}`
      )
    }

    return response.json()
  },

  // Like a thought
  likeThought: async (id) => {
    const response = await fetch(`${API_BASE_URL}/thoughts/${id}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ thoughtId: id })
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    return response.json()
  }
}
