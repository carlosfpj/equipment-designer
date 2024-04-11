import NavLogo from "./navlogo/NavLogo";
import NavBar from "./navbar/NavBar";
import NavFooter from "./navfooter/NavFooter";
import Styles from "./navrail.module.css"

const NavRail = () => {

  return (
    <div className={Styles.layoutColumn}>
      <div className={Styles.navContent}>
        <NavLogo />
        <NavBar />
      </div>
      <NavFooter />
    </div>
  )
}

export default NavRail;