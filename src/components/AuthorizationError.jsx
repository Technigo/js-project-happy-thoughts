
import { Link } from "react-router-dom"

export const AuthorizationError = () => {
  return (
    <div className="bg-white border absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 p-3">
      <p>You must be logged in to perform this action</p>
      <Link
        className="bg-black text-white"
        to="/login">Go to Login</Link>
    </div>
  )  
}

