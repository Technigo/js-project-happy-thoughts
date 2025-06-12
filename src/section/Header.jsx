import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="bg-red-100 text-white p-4">
      <h1 className="text-2xl font-bold">Happy Thoughts</h1>
      <nav className="mt-2">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/thoughts" className="hover:underline">Thoughts
            </Link>
          </li>
          <li>
            <Link
              to="/signup" className="hover:underline">Sign up
            </Link>
          </li>
          <li>
            <Link
              to="/login" className="hover:underline">Log in
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}