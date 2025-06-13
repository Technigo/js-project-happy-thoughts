import { NavLink, Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="bg-red-100 text-white p-4">
      <h1 className="text-2xl font-bold">
        <Link
          to="/" className="hover:underline">Happy Thoughts
        </Link>
      </h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          <li>
            <NavLink
              to="/signup" className="hover:underline">Sign up
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login" className="hover:underline">Log in
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}