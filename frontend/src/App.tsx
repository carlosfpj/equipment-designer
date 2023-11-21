import React from 'react';
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom';
import {Routes} from 'react-router-dom';
import DashPage from './pages/Dashpage';
import DesignerPage from './pages/Designerpage';
import Blogpage from './pages/Blogpage';
import AboutMePage from './pages/AboutMePage';
import NavigationBar from './components/Navbar/NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavigationBar/>
      <Container>
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
            element={<DesignerPage />}
          />
          <Route
            path='/aboutme'
            element={<AboutMePage />}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
