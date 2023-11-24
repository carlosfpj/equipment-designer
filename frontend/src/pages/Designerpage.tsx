import { Button } from "react-bootstrap";
import { Link, NavLink, Outlet } from "react-router-dom";
import styles from "../styles/Designerpage.module.css";

const DesignerPage = () => {
  return (
    <body>
      <div className={styles.layout}>
        <aside className={styles.aside}>
          <Link to="/designer/line">
            <Button>Lineas</Button>
          </Link>
          <Link to="/designer/separator">
            <Button>Separadores</Button>
          </Link>
          <Link to="/designer/scrubber">
            <Button>Scrubbers</Button>
          </Link>
          <Link to="/designer/kod">
            <Button>KO-Drum</Button>
          </Link>
        </aside>
        <main>
        </main>
        <Outlet/>
      </div>
    </body>

  )
}

export default DesignerPage;