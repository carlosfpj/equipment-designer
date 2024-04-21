import { NavLink } from "react-router-dom";
import "./../Drawer/Drawer.css";
import { useContext } from "react";
import { NavStateContext } from "../../utils/contexts/contexts";

const Drawer = () => {

  const navState = useContext(NavStateContext);

  const navClass = navState === true ? "nav" : "navClose"
  const activeState = ({ isActive }: { isActive: Boolean }) => {
    return {
      color: isActive ? "#001d35" : "",
      fontWeight: isActive ? "bold" : "",
    }
  }

  return (
    <nav className={navClass}>
      <div className="navlayout">
        <NavLink
          to="/designer"
          className="drawerlink"
          style={activeState}
          >
          Designer overview
        </NavLink>
        <details className="details">
          <summary className="summary">Pipes</summary>
          <div className="buttonslayout">
            <NavLink
              to="/designer/pipes/singlephase/liquid"
              className="drawerlink"
              style={activeState}>
              Single-phase, liquid
            </NavLink>
            <NavLink
              to="/designer/pipes/singlephase/gas"
              className="drawerlink"
              style={activeState}>
              Single-phase, gas.
            </NavLink>
            <NavLink
              to="/designer/pipes/twophase"
              className="drawerlink"
              style={activeState}>
              Two-phase.
            </NavLink>
            <NavLink
              to="/designer/pipes/multiphase"
              className="drawerlink"
              style={activeState}>
              Multi-phase.
            </NavLink>
          </div>
        </details>
        <details className="details">
          <summary className="summary">Equipment</summary>
          <div className="buttonslayout">
            <NavLink
              to="/designer/equipment/separator/twophase"
              className="drawerlink"
              style={activeState}>
              Two-phase Separators
            </NavLink>
            <NavLink
              to="/designer/equipment/separator/threephase"
              className="drawerlink"
              style={activeState}>
              Three-phase Separators
            </NavLink>
            <NavLink
              to="/designer/equipment/scrubber"
              className="drawerlink"
              style={activeState}>
              Scrubber
            </NavLink>
            <NavLink
              to="/designer/equipment/kod"
              className="drawerlink"
              style={activeState}>
              KO-Drum
            </NavLink>
          </div>
        </details>
      </div>
    </nav>
  )
}

export default Drawer;