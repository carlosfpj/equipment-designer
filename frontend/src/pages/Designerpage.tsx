import {Outlet} from "react-router-dom";
import AsideLayout from "../layouts/aside/aside";
import styles from "../assets/styles/Designerpage.module.css";

const DesignerPage = () => {
  return (
    <body>
      <div className={styles.layoutRow}>
        <AsideLayout styles={styles}></AsideLayout>
        <main>
          <Outlet />
        </main>
      </div>
    </body>
  )
}

export default DesignerPage;