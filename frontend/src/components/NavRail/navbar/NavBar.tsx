import { NavLink } from "react-router-dom";
import { ReactComponent as HomeLogo } from "../../../icons/Home.svg";
import { ReactComponent as BlogLogo} from "../../../icons/Blog.svg";
import { ReactComponent as DesignerLogo} from "../../../icons/Designer.svg";
import { ReactComponent as AboutMeLogo} from "../../../icons/AboutMe.svg";
import "./NavBar.css";

const NavBar = () => {

  const activeState = ({ isActive }: { isActive: Boolean }) => {
    return {
      color: isActive ? "#001d35" : "",
      fontWeight: isActive ? "bold" : "",
    }
  }

  return (
    <ul>
      <li>
          <NavLink
            to="/"
            className="navlink"
            style={activeState}
          >
            <span className="spanlogo">
              <HomeLogo/>
            </span>
            <div className="label">Home</div>
          </NavLink>
      </li>
      <li>
          <NavLink
            to="/blog"
            className="navlink"
            style={activeState}
          >
            <span className="spanlogo">
              <BlogLogo/>
            </span>
            <div className="label">blog</div>
          </NavLink>
      </li>
      <li>
          <NavLink
            to="/designer"
            className="navlink"
            style={activeState}
          >
            <span className="spanlogo">
              <DesignerLogo/>
            </span>
            <div className="label">designer</div>
          </NavLink>
      </li>
      <li>
          <NavLink
            to="/aboutme"
            className="navlink"
            style={activeState}
          >
            <span className="spanlogo">
              <AboutMeLogo/>
            </span>
            <div className="label">about me</div>
          </NavLink>
      </li>
    </ul>
  )
}

export default NavBar;