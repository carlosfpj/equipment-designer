import React, { useState, useEffect, FormEvent, ChangeEventHandler } from 'react';
import Button from 'react-bootstrap/Button';
import styles from '../assets/styles/LinePage.module.css';
import AddLineDialog from '../components/addLinesDialog';
import Theory from '../components/Theory';
import Line from '../components/Line';
import * as LinesApi from '../network/line_api';
import { Line as LineModel } from '../models/line';
import "./PipeLiquid.css";

const PipeLiquid = () => {
  const [lines, setLines] = useState<LineModel[]>([]);
  const [showAddLineDialog, setShowAddLineDialog] = useState(false);
  const [option, setOption] = useState(0);
  const [showOption, setShowOption] = useState(false);
  const [flowRate, setFlowRate] = useState("0");
  const [pipeDiameter, setPipeDiameter] = useState("0");
  const [SG, setSG] = useState("0");
  const [liquidDensity, setLiquidDensity] = useState("0");
  const [liquidViscocity, setLiquidViscocity] = useState("0");
  const [resultVelocity, setResultVelocity] = useState("");
  const [resultPressureDrop, setResultPressureDrop] = useState();
  const [pipeMaterialID, setPipeMaterialID] = useState("");

  const BASE_URL_BACK_DEV = "http://localhost:5000";
  const BASE_URL_BACK_PROD = "https://equipment-designer-api.onrender.com";

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

  const handlePipeMaterialChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const value = e.target.value;
    const selectedMaterial = value.toString();
    setPipeMaterialID(selectedMaterial);
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
    handleCalculateOption(option);
  }, [option]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if(!showOption) {
        const res = await fetch(`${BASE_URL_BACK_PROD}/designer/pipes/singlephase/liquid/vel`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            "flow": flowRate,
            "diameter": pipeDiameter,
          }),
        });
        if(res.status === 200) {
          const data = console.log(res);
          const resJson = await res.json();
          console.log(JSON.parse(JSON.stringify(resJson)));
          setResultVelocity(resJson);
        } else if (res.status === 400) {
          alert("flow and diameter is required for calculations");
        } else {
          console.log("an error has ocurred");
        }
      } else {
        const res = await fetch(`${BASE_URL_BACK_PROD}/designer/pipes/singlephase/liquid/vp`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
          },
          body: JSON.stringify({
            "flow": flowRate,
            "diameter": pipeDiameter,
            "SG": SG,
            "liquidDensity": liquidDensity,
            "liquidViscocity": liquidViscocity,
            "pipeMaterialID": pipeMaterialID,
          }),
        });
        if (res.status === 200) {
          const resJson = await res.json();
          console.log(resJson);
          setResultVelocity(resJson.liquidVelocity);
          setResultPressureDrop(resJson.liquidPressureDrop);

        } else if (res.status === 400) {
          alert("flow and diameter is required for calculations");
        } else {
          console.log("an error has ocurred");
        }
      }
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div className="maincontent">
      <div className="maincontent-header">
        <div className="hero">
          <div className="full-width">
            <div className="hero-content">
              <div className="hero-image">
                <div className="hero-text">
                  <h1>Single Phase-Liquid</h1>
                  <h2>Sizing Criteria</h2>
                  <h3>API RP 14E</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="maincontent-theory">
        <Theory />
        {/* <Button onClick={() => setShowAddLineDialog(true)}>Add new Line Calculation</Button> */}
      </div>

      <div className="maincontent-form">
        <div className="form-intro">
          <p className='p'>If you want to calculate liquid pipes for the oil&gas industry
            based on the previous equations, please insert the following data.
            The results will be displayed at the bottom section of the form.
          </p>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="radio-group">
              <p>Choose the type of calculation you want to perform</p>
              <input type='radio'
                id='vel'
                name='a'
                value="vel"
                checked={option === 0}
                onChange={() => handleCalculateOption(0)}
              />
              <label className="radio-label" htmlFor="vel">Velocity</label>

              <input type='radio'
                id='Pdrop'
                name='a'
                value="Pdrop"
                checked={option === 1}
                onChange={() => handleCalculateOption(1)}
              />
              <label className="radio-label" htmlFor="Pdrop">Pressure Drop</label>

              <input type='radio'
                id='VP'
                name='a'
                value="VP"
                checked={option === 2}
                onChange={() => handleCalculateOption(2)}
              />
              <label className="radio-label" htmlFor="VP">Velocity and Pressure Drop</label>
            </div>

            <div className="input-group">
              <label>Liquid flow rate[barrels/day]</label>
              <input type='text' onChange={handleFlowChange} value={flowRate} /><br />
              <label>pipe inside diameter[inches]</label>
              <input type='text' onChange={handlepipeDiameterChange} value={pipeDiameter} /><br />

              {showOption &&
                <div>
                  <label htmlFor='material'>Pipe material</label><br />
                  <select name='material' id='material' onChange={handlePipeMaterialChange}>
                    <option>Select one from this dropdown list</option>
                    <option value="1">1. Drawn Cooper, Lead, Brass, new Aluminum</option>
                    <option value="2">2. PVC, PE and other smooth Plastic Pipes</option>
                    <option value="3">3. Stainless steel, bead blasted</option>
                    <option value="4">4. Stainless steel, turned</option>
                    <option value="5">5. Stainless steel, electron-polished</option>
                    <option value="6">6. Commercial steel or wrought iron</option>
                    <option value="7">7. Stretched steel</option>
                    <option value="8">8. Weld steel</option>
                    <option value="9">9. Galvanized steel</option>
                    <option value="10">10. Rusted steel (corrosion)</option>
                    <option value="11">11. New cast iron</option>
                    <option value="12">12. Worn cast iron</option>
                    <option value="13">13. Rusty cast iron</option>
                    <option value="14">14. Sheet or asphalted cast iron</option>
                    <option value="15">15. Smoothed cement</option>
                    <option value="16">16. Ordinary concrete</option>
                    <option value="17">17. Coarse concrete</option>
                    <option value="18">18. Wood stove</option>
                    <option value="19">19. Well planed wood</option>
                    <option value="20">20. Ordinary wood</option>
                  </select>
                  <br />
                  <label>Liquid Specific Gravity [S]</label>
                  <input type='text' onChange={handleSGChange} value={SG} /><br />
                  <label>Liquid Density [lb/ft3]</label>
                  <input type='text' onChange={handleDensityChange} value={liquidDensity} /><br />
                  <label>Liquid Viscocity [Cp]</label>
                  <input type='text' onChange={handleViscocityChange} value={liquidViscocity} /><br />
                </div>}
            </div>

            <button>submit</button>
          </form>

          <p>velocity: {resultVelocity} ft/seg</p>
          <p>pressure Drop: {resultPressureDrop} psi/100feet</p>
          <p>PipeMaterial: {pipeMaterialID}</p>
        </div>
      </div>

    </div>
  )
}

export default PipeLiquid;