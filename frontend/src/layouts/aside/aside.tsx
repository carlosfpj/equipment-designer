import { Link } from "react-router-dom";
import AsideButton from "../../components/AsideButton";
import asideStyles from "./aside.module.css";

const AsideLayout = ({ styles }: any) => {

  return (
    <aside className={styles.aside}>
      <details open className={asideStyles.details}>
        <summary className={asideStyles.summary}>Pipes</summary>
          <div className={asideStyles.buttonslayout}>
            <Link to="/designer/line/singlephase/liquid">
              <AsideButton>Single-phase, liquid</AsideButton>
            </Link>
            <Link to="/designer/line/singlephase/gas">
              <AsideButton>Single-phase, gas.</AsideButton>
            </Link>
            <Link to="/designer/line/twophase">
              <AsideButton>Two-phase.</AsideButton>
            </Link>
            <Link to="/designer/line/multiphase">
              <AsideButton>Multi-phase.</AsideButton>
            </Link>
          </div>
      </details>
      <details className={asideStyles.details}>
        <summary className={asideStyles.summary}>Equipment</summary>
          <div className={asideStyles.buttonslayout}>
            <Link to="/designer/separator">
              <AsideButton>Two-phase Separators</AsideButton>
            </Link>
            <Link to="/designer/separator">
              <AsideButton>Three-phase Separators</AsideButton>
            </Link>
            <Link to="/designer/scrubber">
              <AsideButton>Scrubber</AsideButton>
            </Link>
            <Link to="/designer/kod">
              <AsideButton>KO-Drum</AsideButton>
            </Link>
          </div>
      </details>
    </aside>
  )
}

export default AsideLayout;


