import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function ChartTest() {

  const containerRef = useRef();

  const values = [[0.614, '3/4 SCH 160 (I.D = 0.614")'], [0.957, '1" SCH 80 (I.D = 0.957")'] ,
                  [1.278, '1-1/4" SCH 80 (I.D = 1.278")'], [1.5, '1-1/2" SCH 80 (I.D = 1.500")'],
                  [1.939, '2" SCH 80 (I.D = 1.939")'], [2.125, '2-1/2" SCH 160 (I.D = 2.125")'],
                  [2.323, '2-1/2" SCH 80 (I.D = 2.323")'], [2.9, '3" SCH 80 (I.D = 1.939")'],
                  [3.826, '4" SCH 80 (I.D = 3.826")'], [6.065, '6" SCH 80 (I.D = 6.065")'],
                  [7.981, '8" SCH 40 (I.D = 7.981")'], [10.02, '10" SCH 40 (I.D = 10.02")'],
                  [11.938, '12" SCH 40 (I.D = 11.938")'], [13.25, '14" SCH 30 (I.D = 13.25")'],
                  [15.250, '16" SCH 30 (I.D = 15.250")',], [17.25, '18" STD W.T (I.D = 17.250")'],
  ];

  const Y = (x,d) => (0.012 * x) / d **2;
  const Yr = (y,d) => (d ** 2 * y) / 0.012;
  const x = (d) => Math.exp(Math.log(800) + 1.2 * Math.log(d));
  const MAX_VELOCITY = 14;
  const MIN_VELOCITY = 3;

  useEffect(() => {
    if(values === undefined) return;

    const plot = Plot.plot({
      width: 800,
      height: 600,
      x: { type: "log", domain: [100, 100_000], label: "FLOW [BARREL/DAY]" },
      y: { type: "log", domain: [0.5, 50], tickFormat: ",", label: "VELOCITY [FT/S]" },
      marks: [
        Plot.gridX(
          d3
            .range(100, 1_000, 20)
            .concat(d3.range(1_000, 10_000, 200))
            .concat(d3.range(10_000, 100_000, 2_000))
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
            .range(0.5, 1, 0.05)
            .concat(d3.range(1, 10, 0.2))
            .concat(d3.range(10, 50, 1))
            .concat(50),
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
          x1: (d) => (Y(100, d[0]) > 0.5 ? 100 : Yr(0.5, d[0])),
          y1: (d) => Math.max(Y(100, d[0]), 0.5),
          x2: (d) => (Y(100_000, d[0]) < 50 ? 100_000 : Yr(50, d[0])),
          y2: (d) => Math.min(Y(100_000, d[0]), 50)
        }),
        Plot.ruleY([MAX_VELOCITY, MIN_VELOCITY], { stroke: "red"}),
        Plot.text([MIN_VELOCITY, MAX_VELOCITY], {
          y: (d) => d,
          x: [150, 150],
          text: ["Minimum", "Maximum"],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "bottom",
          dy: -3,
        }),
        Plot.text(values, {
          text: (d) => d[1],
          x: (d) => x(d[0]),
          y: (d) => Y(x(d[0]), d[0]),
          rotate: -48,
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
  },[values]);

  return <div ref={containerRef}/>;
}