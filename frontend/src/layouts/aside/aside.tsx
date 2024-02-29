import { Link } from "react-router-dom";
import AsideButton from "../../components/AsideButton";
import asideStyles from "./aside.module.css";

const AsideLayout = ({ styles }: any) => {

  return (
    <aside className={styles.aside}>
      <details open className={asideStyles.details}>
        <summary className={asideStyles.summary}>Pipes</summary>
          <div className={asideStyles.buttonslayout}>
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
      <details className={asideStyles.details}>
        <summary className={asideStyles.summary}>Equipment</summary>
          <div className={asideStyles.buttonslayout}>
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
    </aside>
  )
}

export default AsideLayout;


