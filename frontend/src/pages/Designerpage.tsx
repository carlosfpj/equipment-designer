import {Outlet} from "react-router-dom";
import styles from "../assets/styles/Designerpage.module.css";

const DesignerPage = () => {
  return (
      <div className={styles.layoutRow}>
        <main>
          <Outlet />
        </main>
      </div>
  )
}

export default DesignerPage;