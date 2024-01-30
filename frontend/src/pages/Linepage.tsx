import React, { useState, useEffect, FormEvent, ChangeEventHandler, MouseEventHandler } from 'react';
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
  const [option, setOption] = useState(0);
  const [showOption, setShowOption] = useState(false);
  const [flowRate, setFlowRate] = useState("");
  const [pipeDiameter, setPipeDiameter] = useState("");
  const [SG, setSG] = useState("");
  const [liquidDensity, setLiquidDensity] = useState("");
  const [liquidViscocity, setLiquidViscocity] = useState("");
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

  const handleDensityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const liquidDensity = e.target.value;
    setLiquidDensity(liquidDensity);
  }

  const handleViscocityChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const liquidViscocity = e.target.value;
    setLiquidViscocity(liquidViscocity);
  }

  const handleCalculateOption = (value: number) => {
    setOption(value);
    if(option === 0) {
      setShowOption(false);
    } else if (option === 1 || option === 2) {
     setShowOption(true);
    }
  }

  useEffect(() => {
    console.log(option);
    handleCalculateOption(option);
  }, [option])

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
              "liquidDensity": liquidDensity,
              "liquidViscocity": liquidViscocity,
            }),
          });
          if(res.status === 200) {
            const resJson = await res.json();
            console.log(resJson);
            setResult(resJson.liquidVelocity);
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
        <label>select what you desire</label><br/>
        <input type='radio'
          id='vel'
          name='a'
          value="vel"
          checked={option === 0}
          onChange={() => handleCalculateOption(0)}
        />
        <label htmlFor="vel">Velocity</label>
        <br /><br />
        <input type='radio'
          id='Pdrop'
          name='a'
          value="Pdrop"
          checked={option === 1}
          onChange={() => handleCalculateOption(1)}
        />
        <label htmlFor="Pdrop">Pressure Drop</label>
        <br /><br />
        <input type='radio'
          id='VP'
          name='a'
          value="VP"
          checked={option === 2}
          onChange={() => handleCalculateOption(2)}
        />
        <label htmlFor="VP">Velocity and Pressure Drop</label>
        <br /><br />
        <label>Liquid flow rate[barrels/day]</label>
        <input type='text' onChange={handleFlowChange}/><br/>
        <label>pipe inside diameter[inches]</label>
        <input type='text' onChange={handlepipeDiameterChange} /><br/>
        {showOption &&
          <div>
            <label>Specific Gravity</label>
            <input type='text' onChange={handleSGChange} /><br />
            <label>Liquid Density</label>
            <input type='text' onChange={handleDensityChange} /><br />
            <label>Liquid Viscocity</label>
            <input type='text' onChange={handleViscocityChange} /><br />
          </div>}
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

