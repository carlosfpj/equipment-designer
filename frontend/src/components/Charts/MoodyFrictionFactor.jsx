import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function PressureDropLiquidChart() {

  const SP_GR = 1;
  const MOODY = 0.36;
  const Y = (x, d) => (0.000115 * MOODY * (x ** 2) * SP_GR / (d ** 5));
  const Yr = (y, d) => Math.sqrt((y * d ** 5) / (0.000115 * MOODY * SP_GR));
  const x = (d) => Math.exp(Math.log(250) + 2 * Math.log(d));

  const containerRef = useRef();

  const values = [[0.614, '3/4 SCH 160 (I.D = 0.614")'], [0.957, '1" SCH 80 (I.D = 0.957")'],
  [1.278, '1-1/4" SCH 80 (I.D = 1.278")'], [1.5, '1-1/2" SCH 80 (I.D = 1.500")'],
  [1.939, '2" SCH 80 (I.D = 1.939")'], [2.125, '2-1/2" SCH 160 (I.D = 2.125")'],
  [2.323, '2-1/2" SCH 80 (I.D = 2.323")'], [2.9, '3" SCH 80 (I.D = 1.939")'],
  [3.826, '4" SCH 80 (I.D = 3.826")'], [6.065, '6" SCH 80 (I.D = 6.065")'],
  [7.981, '8" SCH 40 (I.D = 7.981")'], [10.02, '10" SCH 40 (I.D = 10.02")'],
  [11.938, '12" SCH 40 (I.D = 11.938")'], [13.25, '14" SCH 30 (I.D = 13.25")'],
  [15.250, '16" SCH 30 (I.D = 15.250")',], [17.25, '18" STD W.T (I.D = 17.250")'],
  ];

  useEffect(() => {
    if (values === undefined) return;

    const plot = Plot.plot({
      width: 800,
      height: 600,
      x: { type: "log", domain: [600, 100_000_000], label: "Reynolds Number, Re" },
      y: { type: "log", domain: [0.010, 0.10], tickFormat: ",", label: "Friction Factor, f" },
      marks: [
        Plot.gridX(
          d3
            .range(600, 1_000, 100)
            .concat(d3.range(1_000, 3_000, 100))
            .concat(d3.range(3_000, 10_000, 500))
            .concat(d3.range(10_000, 30_000, 1000))
            .concat(d3.range(30_000, 100_000, 5000))
            .concat(d3.range(100_000, 300_000, 10000))
            .concat(d3.range(300_000, 1_000_000, 50000))
            .concat(d3.range(1_000_000, 3_000_000, 100000))
            .concat(d3.range(3_000_000, 100_000_000, 500_000))
            .concat(100_000_000),
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
            .range(0.010, 0.030, 0.005)
            .concat(d3.range(0.030, 0.10, 0.001))
            .concat(0.10),
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
        Plot.link([[650, 0.10], [2500, 0.026]], {
          x1: 650,
          y1: 0.10,
          x2: 2500,
          y2: 0.026,
        }),

        Plot.line([[3900, 0.076], [9500, 0.074], [20000, 0.072]], {
          x0: 3900,
          y0: 0.076,
          x1: 9500,
          y1: 0.074,
          curve: "basis"
        }),
        Plot.line([[20000, 0.072,], [100000000, 0.072,]], {
          x1: 20000,
          y1: 0.072,
          x2: 100000000,
          y2: 0.072,
        }),

        Plot.line([[3300, 0.073], [9000, 0.067], [40000, 0.065]], {
          x0: 3300,
          y0: 0.073,
          x1: 9000,
          y1: 0.067,
          curve: "basis"
        }),
        Plot.line([[40000, 0.065,], [100000000, 0.065,]], {
          x1: 40000,
          y1: 0.065,
        }),

        Plot.line([[3250, 0.066], [12000, 0.059], [90000, 0.057]], {
          x0: 3250,
          y0: 0.066,
          x1: 12000,
          y1: 0.059,
          curve: "natural"
        }),
        Plot.line([[90000, 0.057,], [100000000, 0.057,]], {
          x1: 90000,
          y1: 0.057,
        }),

        Plot.line([[3400, 0.059], [14100, 0.052], [140000, 0.0485]], {
          x0: 3400,
          y0: 0.059,
          x1: 18100,
          y1: 0.051,
          curve: "monotone-x"
        }),
        Plot.line([[140000, 0.0485,], [100000000, 0.0485,]], {
          x1: 140000,
          y1: 0.048,
        }),


        Plot.text([5], {
          y: (d) => d,
          x: [104],
          text: ['3/4 SCH 160 (I.D = 0.614")'],
          rotate: -62,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
          dy: 18,
        }),
        Plot.text([2], {
          y: (d) => d,
          x: [170],
          text: ['1" SCH 80 (I.D = 0.957")'],
          rotate: -63,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
          dy: 19,
        }),
        Plot.text([2], {
          y: (d) => d,
          x: [367],
          text: ['1-1/4" SCH 80 (I.D = 1.278")'],
          rotate: -63,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
          dy: 25,
        }),
        Plot.text([2], {
          y: (d) => d,
          x: [560],
          text: ['1-1/2" SCH 80 (I.D = 1.500")'],
          rotate: -63,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
          dy: 25,
        }),
        Plot.text([1.3], {
          y: (d) => d,
          x: [900],
          text: ['2" SCH 80 (I.D = 1.939")'],
          rotate: -63,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
        }),
        Plot.text([1.3], {
          y: (d) => d,
          x: [1250],
          text: ['2-1/2" SCH 160 (I.D = 2.125")'],
          rotate: -63,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
        }),
        Plot.text([1.3], {
          y: (d) => d,
          x: [1600],
          text: ['2-1/2" SCH 80 (I.D = 2.323")'],
          rotate: -63,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
        }),
        Plot.text([1.0], {
          y: (d) => d,
          x: [2530],
          text: ['3" SCH 80 (I.D = 1.939")'],
          rotate: -65,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
        }),
        Plot.text([1.0], {
          y: (d) => d,
          x: [4650],
          text: ['4" SCH 80 (I.D = 3.826")'],
          rotate: -64,
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "middle",
          textAnchor: "start",
        }),
      ]
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [values]);

  return <div ref={containerRef} />;
}