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
            element={<OnConstruction/>}>
          </Route>
          <Route
            path='/blog'
            element={<OnConstruction/>}>
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
              element={<OnConstruction />}>
            </Route>
            <Route
              path='pipes/twophase'
              element={<OnConstruction />}>
            </Route>
            <Route
              path='pipes/multiphase'
              element={<OnConstruction />}>
            </Route>
            <Route
              path='equipment/separator/twophase'
              element={<OnConstruction />}>
            </Route>
            <Route
              path='equipment/separator/threephase'
              element={<OnConstruction />}>
            </Route>
            <Route
              path='equipment/scrubber'
              element={<OnConstruction />}>
            </Route>
            <Route
              path='equipment/kod'
              element={<OnConstruction />}>
            </Route>
          </Route>
          <Route
            path='/aboutme'
            element={<OnConstruction />}>
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
