import { Link } from "react-router"

const NavLink = ({ text, linkTo }) => {
  return (
    <li>
      <Link to={linkTo}>{text}</Link>
    </li>
  )
}

export default NavLink