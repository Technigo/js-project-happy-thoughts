import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import NavLink from "../components/NavLink"

const NavBar = () => {
  const { isLoggedIn, logout } = useAuth()

  return (
    <header className="sticky top-0 w-full left-0 z-2">
      <nav className="flex justify-between py-2 px-2 min-[375px]:px-5 bg-(--color-background) text-(--color-text)">
        <Link to="/" >
          <h1 className="font-semibold" >Happy Thoughts</h1>
        </Link>
        <ul className="flex justify-end gap-3 min-[375px]:gap-6">
          {isLoggedIn ? (
            <>
              <NavLink text="My thoughts" linkTo="/thoughts" />
              <li>
                <button className="cursor-pointer" type="button" onClick={logout}>Log out</button>
              </li>
            </>
          ) : (
            <>
              <NavLink text="Sign up" linkTo="/register" />
              <NavLink text="Log in" linkTo="/login" />
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar