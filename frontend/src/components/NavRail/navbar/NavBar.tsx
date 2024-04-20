import { NavLink } from "react-router-dom";
import { ReactComponent as HomeLogo } from "../../../icons/Home.svg";
import { ReactComponent as BlogLogo} from "../../../icons/Blog.svg";
import { ReactComponent as DesignerLogo} from "../../../icons/Designer.svg";
import { ReactComponent as AboutMeLogo} from "../../../icons/AboutMe.svg";
import "./NavBar.css";
import { useContext } from "react";
import { NavStateContext } from "../../../utils/contexts/contexts";

const NavBar = ({change1}:any) => {

  const activeState = ({ isActive }: { isActive: Boolean }) => {
    return {
      color: isActive ? "#001d35" : "",
      fontWeight: isActive ? "bold" : "",
    }
  }

  const drawerState = useContext(NavStateContext);

  const handleClick = (e:React.MouseEvent):void => {
    console.log(drawerState);
  }

  return (
    <div className="navBarContainer">
      <ul>
        <li>
          <NavLink
            to="/"
            className="navlink"
            style={activeState}
            onClick={()=> change1(false)}
          >
            <span className="spanlogo">
              <HomeLogo />
            </span>
            <div className="label">Home</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className="navlink"
            style={activeState}
            onClick={()=> change1(false)}
          >
            <span className="spanlogo">
              <BlogLogo />
            </span>
            <div className="label">Blog</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/designer"
            className="navlink"
            style={activeState}
            onClick={()=> change1(true)}
          >
            <span className="spanlogo">
              <DesignerLogo />
            </span>
            <div className="label">Designer</div>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/aboutme"
            className="navlink"
            style={activeState}
            onClick={()=> change1(false)}
          >
            <span className="spanlogo">
              <AboutMeLogo />
            </span>
            <div className="label">About me</div>
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default NavBar;