import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from '../styles/LinePage.module.css';
import AddLineDialog from '../components/addLinesDialog';
import Line from '../components/Line';
import { Container } from 'react-bootstrap';
import * as NotesApi from '../network/line_api';
import { Line as LineModel } from '../models/line';


const Linepage = () => {
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
      <h1>Single Phase-Liquid</h1>
      <h2>Sizing Criteria</h2>
      <h3>API RP 14E</h3>
      <p>Single-phase liquid lines should be sized primarily on the basis of flow velocity.
         For lines transporting liquids in single-phase from one pressure vessel to another by pressure differential,
         the flow velocity should not exceed 15ft/s at maximum flow rates, to minimize flashing ahead of the control valve.
         If practical, flow velocity should not be less than 4ft/s to minimize deposition of sand and other solids.
         At these flow velocities the overall pressure drop in the piping will usually be small.
         Most of the pressure drop in liquid lines between two pressure vessels will occur in the liquid dump
      valve and/or choke.</p>

      <p>1.	Flow velocities in liquid lines may be read from figure 2.1 or may be calculated using the following
         derived equation:</p>

      <p>V1 = 0.012 x Q1 / d12</p>

      <Button onClick={() => setShowAddLineDialog(true)}>Add new Line Calculation</Button>

      <Row xs={1} md={2} xl={3} className='g-4'>
        {lines.map(line => (
          <Col key={line._id}>
            <Line line={line} className={styles.line}></Line>
          </Col>
        ))}
      </Row>
      {
        showAddLineDialog &&
        <AddLineDialog
          onDismiss={() => setShowAddLineDialog(false)}
          onLineSaved={(newNote) => {
            setLines([...lines, newNote])
            setShowAddLineDialog(false);
          }}
        />
      }
    </Container>
  )
}

export default Linepage;

