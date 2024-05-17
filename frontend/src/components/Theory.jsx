import fig1 from '../assets/images/1.png';
import fig2 from '../assets/images/2.png';
import fig3 from '../assets/images/3.png';
import "./Theory.css";
import VelocityLiquid from './Charts/VelocityLiquid';

const Theory = () => {

  return (
    <div className="theory">
      <p className="p"><strong>Single-phase liquid</strong> lines should be sized primarily on the basis of flow velocity.
        For lines transporting liquids in single-phase from one pressure vessel to another by pressure differential,
        the flow velocity should not exceed 15ft/s at maximum flow rates, to minimize flashing ahead of the control valve.
        If practical, flow velocity should not be less than 4ft/s to minimize deposition of sand and other solids.
        At these flow velocities the overall pressure drop in the piping will usually be small.
        Most of the pressure drop in liquid lines between two pressure vessels will occur in the liquid dump
        valve and/or choke.</p>

      <p className="p">1.	Flow velocities in liquid lines may be read from figure 2.1 or may be calculated using the following
        derived equation:</p>

      <p className="p">V&#8321; = 0.012 x Q&#8321; / d&#8321;&#xb2;</p>

      <p className="p">where:
        <br />
        V&#8321; = average liquid flow velocity, feet/second.<br />
        Q&#8321; = liquid flow rate, barrels/day.<br />
        d&#8321; = pipe inside diameter, inches.
      </p>

      <VelocityLiquid/>
      <p className="p">Pressure drop (psi per 100 feet of flow length) for single phase liquid lines may be read
        from figure 2 or may be calculated using the following equiation:
      </p>

      <p className="p">&#8710;P = 0.00115f Q&#8321;&#xb2;S&#8321; / d&#8321;&#8309;</p>
      <br />
      <p className="p">where:
        <br />
        &#8710;P = pressure drop, psi/100 feet.<br />
        f = Moody friction factor, dimensionless.<br />
        Q&#8321; = liquid flow rate, barrels/day.<br />
        S&#8321; = liquid specific gravity (water = 1).<br />
        d&#8321; = pipe inside diameter, inches.<br />
      </p><br />

      <img alt='pressure drop in liquid lines' src={fig2}></img>
      <br />

      <p className="p">The Moody friction factor, f is a function of the Reynolds number and the surface roughness of
        the pipe. The modified Moody diagram, figure 3, may be used to determine the friction factor once
        the Reynolds number is known. The Reynolds numbre may be determined by the following equiation:
      </p>

      <p className="p">Re = &rho;<sub>L</sub> d<sub>f</sub> V<sub>L</sub> / &mu;<sub>L</sub> </p>
      <br />
      <p className="p">where:
        <br />
        Re = Reynolds number, dimensionless.<br />
        &rho;<sub>L</sub> = liquid density, lb/ft<sup>3</sup><br />
        d<sub>f</sub> = pipe inside diameter, ft.<br />
        V<sub>L</sub> = liquid flow velocity, ft/sec.<br />
        &mu;<sub>L</sub> = liquid viscosity, lb/ft-sec, or <br />
        <span>" "</span> = centipoise divided by 1488, or <br />
        <span>" "</span> = centistokes times specific gravity divided by 1488<br />
      </p><br />
      <img alt='Moody friction factor' src={fig3}></img><br />
    </div>
  )
}

export default Theory;

