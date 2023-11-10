import React, { useState, useEffect} from 'react';
import { Line as LineModel} from './models/line';
import Line from './components/Line';

function App() {

  const [lines, setLines] = useState<LineModel[]>([]);

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
    <div>
      {lines.map(line => (
        <Line line={line} key={line._id}></Line>
      ))}
    </div>
  );
}

export default App;
