import Drawer from "./../Drawer/Drawer";
import styles from "./NavigationDrawer.module.css";

const NavigationDrawer = () => {

  return (
    <div className={styles.DrawerContainer}>
      <Drawer />
    </div>
  )
}

export default NavigationDrawer;


