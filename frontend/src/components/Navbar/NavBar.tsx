import { NavLink } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import "./NavBar.css";

const NavigationBar = () => {

  const activeState = ({isActive} : {isActive: Boolean}) => {
    return {
      color: isActive ? "rgb(253 230 138)" : "",
      backgroundColor: isActive ? "rgb(69 26 3)": "",
      fontWeight: isActive ? "bold": "",
    }
  }
  return (
    <Navbar>
      <Container>
        <ul>
          <li>
            <Navbar.Brand>
              <img
                src="../icons/logo.jpg"
                alt=""
                width="30"
                height="30"
              />
            </Navbar.Brand>
          </li>
          <li>
            <NavLink
                to="/"
                className="navlink"
                style={activeState}
            >Home</NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className="navlink"
              style={activeState}
            >blog</NavLink>
          </li>
          <li>
            <NavLink
              to="/designer"
              className="navlink"
              style={activeState}
            >designer</NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutme"
              className="navlink"
              style={activeState}
            >about me</NavLink>
          </li>
        </ul>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;