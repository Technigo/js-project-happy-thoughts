import { Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedPage = ({ children }) => {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }
  return children
}

export default ProtectedPage