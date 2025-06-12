import NavLink from "../components/NavLink"

const NavBar = ({ loggedIn, logOut }) => {

  return (
    <header className="sticky top-0 w-full left-0 z-2">
      <nav className="py-2 px-5 bg-(--color-background) text-(--color-text)">
        <ul className="flex justify-end gap-6">
          {loggedIn ? (
            <>
              <NavLink text="Thoughts" linkTo="/thoughts" />
              <li>
                <button type="button" onClick={logOut}>Log out</button>
              </li>
            </>
          ) : (
            <>
              <NavLink text="Log in" linkTo="/login" />
              <NavLink text="Sign up" linkTo="/register" />
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default NavBar