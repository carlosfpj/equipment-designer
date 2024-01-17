import React, { useState, useEffect, FormEvent, ChangeEventHandler } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from '../styles/LinePage.module.css';
import AddLineDialog from '../components/addLinesDialog';
import Theory from '../components/Theory';
import Line from '../components/Line';
import { Container } from 'react-bootstrap';
import * as LinesApi from '../network/line_api';
import { Line as LineModel } from '../models/line';

const Linepage = () => {
  const [lines, setLines] = useState<LineModel[]>([]);
  const [showAddLineDialog, setShowAddLineDialog] = useState(false);
  const [flowRate, setFlowRate] = useState("");
  const [pipeDiameter, setPipeDiameter] = useState("");
  const [SG, setSG] = useState("");
  const [result, setResult] = useState();

  const handleFlowChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const flowRate = e.target.value;
    setFlowRate(flowRate);
  };

  const handlepipeDiameterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const pipeDiameter = e.target.value;
    setPipeDiameter(pipeDiameter);
  };

  const handleSGChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const liquidSG = e.target.value;
    setSG(liquidSG);
  }

  const handleSubmit = async (e: FormEvent) => {

    e.preventDefault();
    console.log("click en submit");
        try {
          const res = await fetch("http://localhost:5000/line/singlephase/", {
            method: "POST",
            headers: {
              "Content-Type": 'application/json',
            },
            body: JSON.stringify({
              "flow": flowRate,
              "diameter": pipeDiameter,
              "SG": SG,
            }),
          });
          if(res.status === 200) {
            const resJson = await res.json();
            console.log(resJson);
            setResult(resJson.velocity);
          } else if (res.status === 400){
            alert("flow and diameter is required for calculations");
          } else {
            console.log("an error has ocurred");
          }
      } catch (error) {
        console.log(error);
      }
  }

  useEffect(() => {
    async function loadNotes() {
      try {
        const lines = await LinesApi.fetchLines();
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
      <Theory/>

      <Button onClick={() => setShowAddLineDialog(true)}>Add new Line Calculation</Button>

      <p>Please insert data to calculate</p>
      <form onSubmit={handleSubmit}>
        <label>Liquid flow rate[barrels/day]</label>
        <input type='text' onChange={handleFlowChange}/><br/>
        <label>pipe inside diameter[inches]</label>
        <input type='text' onChange={handlepipeDiameterChange} /><br/>
        <label>Specific Gravity</label>
        <input type='text' onChange={handleSGChange} /><br/>
        <button>submit</button>
      </form>

      <p>velocity: {result} ft/seg</p>

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

