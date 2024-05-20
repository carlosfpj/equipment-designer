import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function PressureDropLiquidChart() {

  const SP_GR = 1;
  const MOODY = 0.37;

  const containerRef = useRef();

  const values = [[0.614, '3/4 SCH 160 (I.D = 0.614")'],  [0.957, '1" SCH 80 (I.D = 0.957")'],
                 [1.278, '1-1/4" SCH 80 (I.D = 1.278")'], [1.5, '1-1/2" SCH 80 (I.D = 1.500")'],
                 [1.939, '2" SCH 80 (I.D = 1.939")'],     [2.125, '2-1/2" SCH 160 (I.D = 2.125")'],
                 [2.323, '2-1/2" SCH 80 (I.D = 2.323")'], [2.9, '3" SCH 80 (I.D = 1.939")'],
                 [3.826, '4" SCH 80 (I.D = 3.826")'],     [6.065, '6" SCH 80 (I.D = 6.065")'],
                 [7.981, '8" SCH 40 (I.D = 7.981")'],     [10.02, '10" SCH 40 (I.D = 10.02")'],
                 [11.938, '12" SCH 40 (I.D = 11.938")'],  [13.25, '14" SCH 30 (I.D = 13.25")'],
                 [15.250, '16" SCH 30 (I.D = 15.250")',], [17.25, '18" STD W.T (I.D = 17.250")'],
  ];

  //V₁ = 0.012 x Q₁ / d₁²
  // const Y = (x, d) => (0.012 * x) / d ** 2;
  // const Yr = (y, d) => (d ** 2 * y) / 0.012;
  //∆P = 0.00115f Q₁²S₁ / d₁⁵


  const Y = (x, d) => (0.000115 * MOODY * (x**2) * SP_GR / (d ** 5));
  const Yr = (y, d) => Math.sqrt((y * d**5)/(0.000115 * MOODY * SP_GR));
  const x = (d) => Math.exp(Math.log(225) + 2 * Math.log(d));

  useEffect(() => {
    if (values === undefined) return;

    const plot = Plot.plot({
      width: 800,
      height: 600,
      x: { type: "log", domain: [100, 100_000], label: "FLOW [BARREL/DAY]" },
      y: { type: "log", domain: [0.1, 10], tickFormat: ",", label: "PRESSURE DROP [PSI/100 FT]" },
      marks: [
        Plot.gridX(
          d3
            .range(100, 1_000, 10)
            .concat(d3.range(1_000, 10_000, 100))
            .concat(d3.range(10_000, 100_000, 1_000))
            .concat(100_000),
          {
            strokeOpacity: (d) =>
              Math.log10(d) % 1
                ? Math.log10(d * 5) % 1 && Math.log10(d * 2) % 1
                  ? 0.2
                  : 0.5
                : 1,
            strokeWidth: 0.5
          }
        ),
        Plot.gridY(
          d3
            .range(0.1, 1, 0.01)
            .concat(d3.range(1, 10, 0.1))
            .concat(10),
          {
            strokeOpacity: (d) =>
              Math.log10(d) % 1 && Math.log10(d * 2) % 1
                ? Math.log10(d * 5) % 1
                  ? 0.2
                  : 0.5
                : 1,
            strokeWidth: 0.5
          }
        ),
        Plot.link(values, {
          x1: (d) => (Y(100, d[0]) > 0.1 ? 100 : Yr(0.1, d[0])),
          y1: (d) => Math.max(Y(100, d[0]), 0.1),
          x2: (d) => (Y(100_000, d[0]) < 10 ? 100_000 : Yr(10, d[0])),
          y2: (d) => Math.min(Y(100_000, d[0]), 10)
        }),
        Plot.text(values, {
          text: (d) => d[1],
          x: (d) => x(d[0]),
          y: (d) => Y(x(d[0]), d[0]),
          rotate: -66,
          textAnchor: "start",
          fontWeight: "bold",
          dx: -5,
          dy: -5,
          fill: "currentColor",
          stroke: "var(--plot-background)"
        }),
      ]
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [values]);

  return <div ref={containerRef} />;
}