import React, { useState, useEffect} from 'react';
import { Line as LineModel} from './models/line';
import Line from './components/Line';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './styles/LinePage.module.css';

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
    <Container>
      <Row xs={1} md={2} xl={3} className='g-4'>
          {lines.map(line => (
            <Col key={line._id}>
              <Line line={line} className={styles.line}></Line>
            </Col>
          ))}
      </Row>
    </Container>
  );
}

export default App;
