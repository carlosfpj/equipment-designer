import { Button } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";

const DesignerPage = () => {
  return (
    <>
      <h1>DesignerPage</h1>
      <Link to="/designer/line">
        <Button>Lineas</Button>
      </Link>
      <Outlet/>
    </>
  )
}

export default DesignerPage;