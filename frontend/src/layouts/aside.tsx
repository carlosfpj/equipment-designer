import { Link } from "react-router-dom";
import AsideButton from "../components/AsideButton";

const AsideLayout = ({ styles }: any) => {

  return (
    <aside className={styles.aside}>
      <details>
        <summary>Pipes</summary>
          <Link to="/designer/line/singlephase/liquid">
            <AsideButton>Single-phase, liquid</AsideButton>
          </Link>
          <Link to="/designer/line/singlephase/gas">
            <button>Single-phase, gas.</button>
          </Link>
          <Link to="/designer/line/twophase">
            <button>Two-phase.</button>
          </Link>
          <Link to="/designer/line/multiphase">
            <button>Multi-phase.</button>
          </Link>
      </details>
      <details>
        <summary>Equipment</summary>
          <Link to="/designer/separator">
            <button>Two-phase Separators</button>
          </Link>
          <Link to="/designer/separator">
            <button>Three-phase Separators</button>
          </Link>
      </details>
        <Link to="/designer/scrubber">
          <button>Scrubber</button>
        </Link>
        <Link to="/designer/kod">
            <button>KO-Drum</button>
        </Link>
    </aside>
  )
}

export default AsideLayout;


