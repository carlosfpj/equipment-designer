import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import { ReactComponent as HomeLogo } from "../../../icons/Home.svg";
import { ReactComponent as BlogLogo} from "../../../icons/Blog.svg";
import { ReactComponent as DesignerLogo} from "../../../icons/Designer.svg";
import { ReactComponent as AboutMeLogo} from "../../../icons/AboutMe.svg";
import "./NavBar.css";

const NavBar = () => {

  const activeState = ({ isActive }: { isActive: Boolean }) => {
    return {
      color: isActive ? "rgb(253 230 138)" : "",
      backgroundColor: isActive ? "rgb(69 26 3)" : "",
      fontWeight: isActive ? "bold" : "",
    }
  }

  return (
    <Container>
      <ul>
        <li>
          <NavLink
            to="/"
            className="navlink"
            style={activeState}
          ><span className="spanlogo">
              <HomeLogo/>
            </span>Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className="navlink"
            style={activeState}
          ><span className="spanlogo">
              <BlogLogo/>
            </span>blog</NavLink>
        </li>
        <li>
          <NavLink
            to="/designer"
            className="navlink"
            style={activeState}
          ><span className="spanlogo">
              <DesignerLogo/>
            </span>designer</NavLink>
        </li>
        <li>
          <NavLink
            to="/aboutme"
            className="navlink"
            style={activeState}
          ><span className="spanlogo">
              <AboutMeLogo/>
            </span>about me</NavLink>
        </li>
      </ul>
    </Container>
  )
}

export default NavBar;