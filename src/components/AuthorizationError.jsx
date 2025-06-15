
import { Link } from "react-router-dom"

export const AuthorizationError = () => {
  return (
    <div className="flex flex-col bg-white border rounded-1 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 p-4 text-center shadow-2xl">
      <button
        type="button"
        className="p-1 max-w-6 max-h-6 self-end"
        aria-label="Close"
      >
        <img
          className="w-4 h-4"
          src="assets/close.png"
          alt=""
        />
      </button>
      <p>You must be logged in to perform this action</p>
      <button className="bg-black mt-4 py-1 px-2 rounded-xl">
        <Link
          className="text-white"
          to="/login">Go to Login</Link>
      </button>
    </div>
  )
}

