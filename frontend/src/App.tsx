import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import { Line } from './models/line';

function App() {

  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    async function loadNotes() {
      try {
        const response = await fetch("/line", { method: "GET" });
        const lines = await response.json();
        setLines(lines);
      } catch (error) {
        console.error(error);
        alert(error);
      }
    }
    loadNotes();
  }, []);

  return (
    <div className="App">
      {JSON.stringify(lines)}
    </div>
  );
}

export default App;
