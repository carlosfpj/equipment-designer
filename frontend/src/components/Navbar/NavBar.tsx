import { NavLink } from "react-router-dom";
import { Container, Navbar } from "react-bootstrap";
import "./NavBar.css";

const NavigationBar = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <img
            src="../icons/logo.jpg"
            alt=""
            width="30"
            height="30"
          />
        </Navbar.Brand>
          <NavLink
            to="/"
            className="navlink"
          >Home</NavLink>
        <NavLink
          to="/blog"
        >blog</NavLink>
        <NavLink
          to="/designer"
        >designer</NavLink>
        <NavLink
          to="/me"
        >about me</NavLink>
      </Container>
    </Navbar>
  )
}

export default NavigationBar;