import {Outlet} from "react-router-dom";
import styles from "../assets/styles/Designerpage.module.css";

const DesignerPage = () => {
  return (
    <body>
      <div className={styles.layoutRow}>
        <main>
          <Outlet />
        </main>
      </div>
    </body>
  )
}

export default DesignerPage;