import Drawer from "./../Drawer/Drawer";
import AppContent from "../AppContent/AppContent";
import styles from "./NavigationDrawer.module.css";

const NavigationDrawer = () => {

  return (
    <>
      <div className={styles.DrawerContainer}>
        <Drawer />
      </div>
      <AppContent />
    </>
  )
}

export default NavigationDrawer;


