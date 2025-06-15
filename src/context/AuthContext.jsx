import { createContext, useState, useEffect, useContext } from "react"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({}) //object with username, and id
  const [token, setToken] = useState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  //on load - get user info from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    const storedToken = localStorage.getItem("accessToken")

    if (storedUser && storedToken) {
      setCurrentUser(JSON.parse(storedUser))
      setToken(storedToken)
      setIsLoggedIn(true)
    }
  }, [])

  const login = (userData, accessToken) => {
    setCurrentUser(userData)
    setToken(accessToken)
    setIsLoggedIn(true)
    localStorage.setItem("user", JSON.stringify(userData))
    localStorage.setItem("accessToken", accessToken)
  }

  const logout = () => {
    setCurrentUser(null)
    setToken(null)
    setIsLoggedIn(false)
    localStorage.removeItem("user")
    localStorage.removeItem("accessToken")
  }

  return (
    <AuthContext.Provider value={{ currentUser, token, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)