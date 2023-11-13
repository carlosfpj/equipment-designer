import React, { useState, useEffect} from 'react';
import { Line as LineModel} from './models/line';
import Line from './components/Line';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from './styles/LinePage.module.css';
import * as NotesApi from './network/line_api';
import AddLineDialog from './components/addLinesDialog';

function App() {

  const [lines, setLines] = useState<LineModel[]>([]);
  const [showAddLineDialog, setShowAddLineDialog] = useState(false);

  useEffect(() => {
    async function loadNotes() {
      try {
        const lines = await NotesApi.fetchLines();
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
      <Button onClick={() => setShowAddLineDialog(true)}>Add new Line Calculation</Button>
      <Row xs={1} md={2} xl={3} className='g-4'>
          {lines.map(line => (
            <Col key={line._id}>
              <Line line={line} className={styles.line}></Line>
            </Col>
          ))}
      </Row>
      {showAddLineDialog &&
        <AddLineDialog
          onDismiss={() => setShowAddLineDialog(false)}
          onLineSaved={() => {}}
          />
      }
    </Container>
  );
}

export default App;
