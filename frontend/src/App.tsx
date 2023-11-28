import React from 'react';
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom';
import {Routes} from 'react-router-dom';
import DashPage from './pages/Dashpage';
import DesignerPage from './pages/Designerpage';
import Blogpage from './pages/Blogpage';
import AboutMePage from './pages/AboutMePage';
import NavigationBar from './components/Navbar/NavBar';
import Linepage from './pages/Linepage';
import SeparatorPage from './pages/SeparatorPage';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
        <Routes>
          <Route
            path='/'
            element={<DashPage/>}
          />
          <Route
          path='/blog'
          element={<Blogpage/>}
          />
          <Route
            path='/designer'
            element={<DesignerPage />}>
            <Route
              path='line/singlephase/liquid'
              element={<Linepage/>}>
            </Route>
            <Route
              path='separator'
              element={<SeparatorPage />} />
          </Route>
          <Route
            path='/aboutme'
            element={<AboutMePage />}
          />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
