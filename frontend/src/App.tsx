import React from 'react';
import Container from 'react-bootstrap/Container'
import { BrowserRouter, Route } from 'react-router-dom';
import {Routes} from 'react-router-dom';
import DashPage from './pages/Dashpage';
import Linepage from './pages/Linepage';
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
          path='/line'
          element={<Linepage/>}
          />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
