import SocialButton from "../components/SocialButton"

const Footer = () => {
  return (
    <footer className="py-7">
      <div className="flex justify-center items-center gap-2">
        <p className="text-sm text-(--color-text)">Created by Mimmi Eriksson</p>
        <ul className="flex gap-2">
          <SocialButton link="https://www.linkedin.com/in/mimmi-aj-eriksson/" icon="/assets/linkedin-btn.svg" text="LinkedIn profile" />
          <SocialButton link="https://github.com/mimmi-eriksson" icon="/assets/github-btn.svg" text="GitHub profile" />
        </ul>
      </div>
    </footer>
  )
}

export default Footer