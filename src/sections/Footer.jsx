import SocialButton from "../components/SocialButton"

const Footer = () => {
  return (
    <footer
      className="py-5"
    >
      <div
        className="flex flex-col items-center gap-1"
      >
        <p
          className="text-sm text-[#c44040]"
        >&copy; {new Date().getFullYear()} Mimmi Eriksson</p>
        <ul
          className="flex gap-2"
        >
          <SocialButton link="https://www.linkedin.com/in/mimmi-aj-eriksson/" icon="/assets/linkedin-btn.svg" text="LinkedIn profile" />
          <SocialButton link="https://github.com/mimmi-eriksson" icon="/assets/github-btn.svg" text="GitHub profile" />
        </ul>
      </div>
    </footer>
  )
}

export default Footer