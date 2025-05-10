import { useState, useEffect, useRef } from 'react'
import { api } from '../api/api'

export const useThoughts = () => {
  const [thoughts, setThoughts] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newThoughtId, setNewThoughtId] = useState(null)

  // Locks
  const isFetchingRef = useRef(false)

  // Fetch all thoughts
  const fetchThoughts = async () => {
    // Prevent duplicate fetches
    if (isFetchingRef.current) {
      console.log('Fetch already in progress, skipping duplicate request')
      return
    }

    isFetchingRef.current = true
    setLoading(true)
    setError(null)

    try {
      const data = await api.getThoughts()

      // Check if data exists and has the expected structure
      if (data && Array.isArray(data)) {
        setThoughts(data)
      } else {
        console.error('Unexpected API response structure:', data)
        setThoughts([])
        setError('Unexpected data format from API')
      }
    } catch (error) {
      console.error('Error fetching thoughts:', error)
      setError('Failed to load happy thoughts. Please try again.')
      setThoughts([])
    } finally {
      setLoading(false)
    }
  }

  // Add new thought
  const addThought = (newObj) => {
    setThoughts((prev) => [newObj, ...prev])
    setNewThoughtId(newObj._id)
    setTimeout(() => setNewThoughtId(null), 1000)
  }

  // Combine optimistic add + full refetch
  const createAndRefresh = async (serverThought) => {
    console.log('createAndRefresh got:', serverThought)
    addThought(serverThought)
    await fetchThoughts()
  }

  // Disable strict mode duplicate effect calls
  const isInitialRender = useRef(true)
  useEffect(() => {
    if (isInitialRender.current) {
      fetchThoughts()
      isInitialRender.current = false
    }
  }, [])

  return {
    thoughts,
    loading,
    error,
    newThoughtId,
    createAndRefresh
  }
}
