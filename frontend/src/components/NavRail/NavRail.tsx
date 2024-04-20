import NavLogo from "./navlogo/NavLogo";
import NavBar from "./navbar/NavBar";
import NavFooter from "./navfooter/NavFooter";
import Styles from "./navrail.module.css"

const NavRail = ({change}:any) => {

  return (
    <div className={Styles.layoutColumn}>
      <div className={Styles.navContent}>
        <NavLogo />
        <NavBar change1={change} />
      </div>
      <NavFooter />
    </div>
  )
}

export default NavRail;