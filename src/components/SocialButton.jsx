const SocialButton = ({ link, icon, text }) => {
  return (
    <li>
      <a
        className=""
        href={link}
        target="_blank"
      >
        <img
          className="w-5 h-5 hover:brightness-80"
          src={icon}
          alt={text} />
      </a>
    </li>
  )
}

export default SocialButton