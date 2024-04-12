import logo from "../../../icons/logo.png";
import styles from "./navlogo.module.css";

const NavLogo = () => {
  return (
      <span className={styles.imagecontainer}>
        <img className={styles.image}
          src={logo}
          alt="equipment designer logo"
        />
      </span>
  )
}

export default NavLogo