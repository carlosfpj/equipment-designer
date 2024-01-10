import React, { useState, useEffect, SyntheticEvent, FormEvent, ChangeEvent, ChangeEventHandler } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import styles from '../styles/LinePage.module.css';
import AddLineDialog from '../components/addLinesDialog';
import Line from '../components/Line';
import { Container } from 'react-bootstrap';
import * as LinesApi from '../network/line_api';
import { Line as LineModel } from '../models/line';
import fig1 from '../images/1.png';
import fig2 from '../images/2.png';
import fig3 from '../images/3.png';


const Linepage = () => {
  const [lines, setLines] = useState<LineModel[]>([]);
  const [showAddLineDialog, setShowAddLineDialog] = useState(false);
  const [flowRate, setFlowRate] = useState(0);
  const [pipeDiameter, setPipeDiameter] = useState(0);

  const handleFlowChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const flowRate = Number(e.target.value);
    setFlowRate(flowRate);
    console.log(flowRate);

  };

  const handlepipeDiameterChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const pipeDiameter = Number(e.target.value);
    setPipeDiameter(pipeDiameter);
    console.log(pipeDiameter);
  };

  const handleSubmit = (e: FormEvent) => {

    e.preventDefault();
    console.log("click en submit");
    try {

      let res = fetch("http://localhost:5000/line/singlephase/", {
        method: "POST",
        body: JSON.stringify({
          flow: flowRate,
          diameter: pipeDiameter
        }),
      });

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
      <p>Single-phase liquid lines should be sized primarily on the basis of flow velocity.
         For lines transporting liquids in single-phase from one pressure vessel to another by pressure differential,
         the flow velocity should not exceed 15ft/s at maximum flow rates, to minimize flashing ahead of the control valve.
         If practical, flow velocity should not be less than 4ft/s to minimize deposition of sand and other solids.
         At these flow velocities the overall pressure drop in the piping will usually be small.
         Most of the pressure drop in liquid lines between two pressure vessels will occur in the liquid dump
      valve and/or choke.</p>

      <p>1.	Flow velocities in liquid lines may be read from figure 2.1 or may be calculated using the following
         derived equation:</p>

      <p>V&#8321; = 0.012 x Q&#8321; / d&#8321;&#xb2;</p>

      <p>where:
        <br/>
        V&#8321; = average liquid flow velocity, feet/second.<br/>
        Q&#8321; = liquid flow rate, barrels/day.<br/>
        d&#8321; = pipe inside diameter, inches.
      </p>

      <img alt='velocity in liquid lines' src={fig1}></img>

      <p>Pressure drop (psi per 100 feet of flow length) for single phase liquid lines may be read
        from figure 2 or may be calculated using the following equiation:
      </p>

      <p>&#8710;P = 0.00115f Q&#8321;&#xb2;S&#8321; / d&#8321;&#8309;</p>
      <br/>
      <p>where:
        <br />
        &#8710;P = pressure drop, psi/100 feet.<br />
        f = Moody friction factor, dimensionless.<br />
        Q&#8321; = liquid flow rate, barrels/day.<br />
        S&#8321; = liquid specific gravity (water = 1).<br />
        d&#8321; = pipe inside diameter, inches.<br />
      </p><br />

      <img alt='pressure drop in liquid lines' src={fig2}></img>
      <br />

      <p>The Moody friction factor, f is a function of the Reynolds number and the surface roughness of
        the pipe. The modified Moody diagram, figure 3, may be used to determine the friction factor once
        the Reynolds number is known. The Reynolds numbre may be determined by the following equiation:
      </p>

      <p>Re = &rho;<sub>L</sub> d<sub>f</sub> V<sub>L</sub> / &mu;<sub>L</sub> </p>
      <br />
      <p>where:
        <br />
        Re = Reynolds number, dimensionless.<br />
        &rho;<sub>L</sub> = liquid density, lb/ft<sup>3</sup><br />
        d<sub>f</sub> = pipe inside diameter, ft.<br/>
        V<sub>L</sub> = liquid flow velocity, ft/sec.<br/>
        &mu;<sub>L</sub> = liquid viscosity, lb/ft-sec, or <br/>
        <span>" "</span> = centipoise divided by 1488, or <br />
        <span>" "</span> = centistokes times specific gravity divided by 1488<br />
      </p><br />

      <img alt='Moody friction factor' src={fig3}></img><br />

      <Button onClick={() => setShowAddLineDialog(true)}>Add new Line Calculation</Button>

      <p>Please insert data to calculate</p>
      <form onSubmit={handleSubmit}>
        <label>Liquid flow rate[barrels/day]</label>
        <input type='text' onChange={handleFlowChange}/><br/>
        <label>pipe inside diameter[inches]</label>
        <input type='text' onChange={handlepipeDiameterChange} />
        <button>submit</button>
      </form>

      <p>results</p>

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

