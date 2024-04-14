import logo from "../../../icons/dark_mode_icon.svg";
import "./navfooter.css";

const NavFooter = () => {
  return (
    <div className="navFooterContainer">
      <span className="spanFooterLogo">
        <img
          src={logo}
          alt="equipment designer logo"
        />
      </span>
    </div>
  )
}

export default NavFooter;