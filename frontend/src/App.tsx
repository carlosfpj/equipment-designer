import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Routes} from 'react-router-dom';
import Homepage from './pages/Homepage';
import DesignerPage from './pages/Designerpage';
import Blogpage from './pages/Blogpage';
import AboutMePage from './pages/AboutMePage';
import NavRail from './components/NavRail/NavRail';
import PipeLiquid from './pages/PipeLiquid';
import SeparatorPage from './pages/SeparatorPage';
import PipeGas from './pages/PipeGas';
import OnConstruction from './pages/OnConstruction';
import NavigationDrawer from './layouts/NavigationDrawer/NavigationDrawer'
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
    <div className={styles.layoutRow}>
      <NavRail />
      <NavigationDrawer />
      <Routes>
          <Route
            path='/'
            element={<Homepage />}>
          </Route>
          <Route
            path='/blog'
            element={<OnConstruction page={"blog"} />}>
          </Route>
          <Route
            path='/designer'
            element={<DesignerPage />}>
            <Route
              path='pipes/singlephase/liquid'
              element={<PipeLiquid />}>
            </Route>
            <Route
              path='pipes/singlephase/gas'
              element={<OnConstruction page={"pipes single phase gas"} />}>
            </Route>
            <Route
              path='pipes/twophase'
              element={<OnConstruction page={"pipes two phase"} />}>
            </Route>
            <Route
              path='pipes/multiphase'
              element={<OnConstruction page={"pipes multiphase"} />}>
            </Route>
            <Route
              path='equipment/separator/twophase'
              element={<OnConstruction page={"separator two phase"} />}>
            </Route>
            <Route
              path='equipment/separator/threephase'
              element={<OnConstruction page={"separator three phase"} />}>
            </Route>
            <Route
              path='equipment/scrubber'
              element={<OnConstruction page={"scrubber"} />}>
            </Route>
            <Route
              path='equipment/kod'
              element={<OnConstruction page={"KOD"} />}>
            </Route>
          </Route>
          <Route
            path='/aboutme'
            element={<OnConstruction page={"about me"} />}>
          </Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
