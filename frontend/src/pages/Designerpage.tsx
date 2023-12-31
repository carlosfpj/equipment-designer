import { Button, Accordion } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import styles from "../styles/Designerpage.module.css";

const DesignerPage = () => {
  return (
    <body>
      <div className={styles.layoutRow}>
        <aside className={styles.aside}>
          <Accordion flush>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Líneas</Accordion.Header>
              <Accordion.Body className={styles.layoutColumn}>
                <Link to="/designer/line/singlephase/liquid">
                  <Button>Una Fase Líquida</Button>
                </Link>
                <Link to="/designer/line/singlephase/gas">
                  <Button>Una Fase gaseosa</Button>
                </Link>
                <Link to="/designer/line/twophase">
                  <Button>Bifásica</Button>
                </Link>
                <Link to="/designer/line/multiphase">
                  <Button>Multifásica</Button>
                </Link>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Separadores</Accordion.Header>
              <Accordion.Body className={styles.layoutColumn}>
                <Link to="/designer/separator">
                  <Button>Bifásicos</Button>
                </Link>
                <Link to="/designer/separator">
                  <Button>Trifásicos</Button>
                </Link>
              </Accordion.Body>
            </Accordion.Item>
            <div className={styles.layoutColumn}>
              <Link to="/designer/scrubber">
              <button>Scrubber</button>
              </Link>
              <Link to="/designer/kod">
              <button>KO-Drum</button>
              </Link>
            </div>
          </Accordion>
        </aside>
        <main>
          <Outlet />
        </main>
      </div>
    </body>
  )
}

export default DesignerPage;