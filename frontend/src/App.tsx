import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import {Routes} from 'react-router-dom';
import DashPage from './pages/Dashpage';
import DesignerPage from './pages/Designerpage';
import Blogpage from './pages/Blogpage';
import AboutMePage from './pages/AboutMePage';
import NavigationBar from './components/Navbar/NavBar';
import PipeLiquid from './pages/PipeLiquid';
import SeparatorPage from './pages/SeparatorPage';
import PipeGas from './pages/PipeGas';
import OnConstruction from './pages/OnConstruction';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
        <Routes>
          <Route
            path='/'
            element={<OnConstruction page={"home"}/>}>
          </Route>
          <Route
            path='/blog'
            element={<OnConstruction page={"blog"}/>}>
          </Route>
          <Route
            path='/designer'
            element={<DesignerPage />}>
            <Route
              path='pipes/singlephase/liquid'
              element={<PipeLiquid/>}>
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
    </BrowserRouter>
  );
}

export default App;
