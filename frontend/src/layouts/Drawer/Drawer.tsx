import { Link } from "react-router-dom";
import AsideButton from "../../components/AsideButton";
import drawerStyles from "./../Drawer/Drawer.module.css";
import { useContext } from "react";
import { NavStateContext } from "../../utils/contexts/contexts";

const Drawer = () => {

  const navState = useContext(NavStateContext);

  const navClass = navState === "open" ? `${drawerStyles.nav}` : `${drawerStyles.navClose}`

  return (
    <nav className={navClass}>
      <details open className={drawerStyles.details}>
        <summary className={drawerStyles.summary}>Pipes</summary>
        <div className={drawerStyles.buttonslayout}>
          <Link to="/designer/pipes/singlephase/liquid">
            <AsideButton>Single-phase, liquid</AsideButton>
          </Link>
          <Link to="/designer/pipes/singlephase/gas">
            <AsideButton>Single-phase, gas.</AsideButton>
          </Link>
          <Link to="/designer/pipes/twophase">
            <AsideButton>Two-phase.</AsideButton>
          </Link>
          <Link to="/designer/pipes/multiphase">
            <AsideButton>Multi-phase.</AsideButton>
          </Link>
        </div>
      </details>
      <details className={drawerStyles.details}>
        <summary className={drawerStyles.summary}>Equipment</summary>
        <div className={drawerStyles.buttonslayout}>
          <Link to="/designer/equipment/separator/twophase">
            <AsideButton>Two-phase Separators</AsideButton>
          </Link>
          <Link to="/designer/equipment/separator/threephase">
            <AsideButton>Three-phase Separators</AsideButton>
          </Link>
          <Link to="/designer/equipment/scrubber">
            <AsideButton>Scrubber</AsideButton>
          </Link>
          <Link to="/designer/equipment/kod">
            <AsideButton>KO-Drum</AsideButton>
          </Link>
        </div>
      </details>
    </nav>
  )
}

export default Drawer;