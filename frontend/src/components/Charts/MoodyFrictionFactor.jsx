import * as Plot from "@observablehq/plot";
import * as d3 from "d3";
import { useEffect, useRef } from "react";

export default function PressureDropLiquidChart() {

  // const SP_GR = 1;
  // const MOODY = 0.36;
  // const Y = (x, d) => (0.000115 * MOODY * (x ** 2) * SP_GR / (d ** 5));
  // const Yr = (y, d) => Math.sqrt((y * d ** 5) / (0.000115 * MOODY * SP_GR));
  // const x = (d) => Math.exp(Math.log(250) + 2 * Math.log(d));

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
      x: { type: "log", domain: [600, 10_000_000], label: "Reynolds Number, Re" },
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
            .concat(d3.range(3_000_000, 10_000_000, 500_000))
            .concat(10_000_000),
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
          curve: "natural"
        }),
        Plot.line([[20000, 0.072,], [10000000, 0.072,]], {
          x1: 20000,
          y1: 0.072,
          x2: 10000000,
          y2: 0.072,
        }),

        Plot.line([[3300, 0.073], [9000, 0.067], [40000, 0.065]], {
          x0: 3300,
          y0: 0.073,
          x1: 9000,
          y1: 0.067,
          curve: "natural"
        }),
        Plot.line([[40000, 0.065,], [10000000, 0.065,]], {
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
        Plot.line([[90000, 0.057,], [10000000, 0.057,]], {
          x1: 90000,
          y1: 0.057,
        }),

        Plot.line([[3400, 0.059], [14100, 0.052], [140000, 0.0485]], {
          x0: 3400,
          y0: 0.059,
          x1: 18100,
          y1: 0.051,
          curve: "natural"
        }),
        Plot.line([[140000, 0.0485,], [10000000, 0.0485,]], {
          x1: 140000,
          y1: 0.048,
        }),

        Plot.line([[3050, 0.055], [12000, 0.047], [110000, 0.044]], {
          x0: 3050,
          y0: 0.055,
          x1: 12000,
          y1: 0.047,
          curve: "natural"
        }),
        Plot.line([[110000, 0.044,], [10000000, 0.0444,]], {
          x1: 110000,
          y1: 0.044,
        }),

        Plot.line([[3050, 0.052], [16100, 0.0419], [180000, 0.038]], {
          x0: 3050,
          y0: 0.052,
          x1: 16100,
          y1: 0.0419,
          curve: "natural"
        }),
        Plot.line([[180000, 0.038,], [10000000, 0.038,]], {
          x1: 180000,
          y1: 0.038,
        }),

        Plot.line([[6500, 0.044], [35000, 0.037], [131000, 0.0351]], {
          x0: 6500,
          y0: 0.044,
          x1: 35000,
          y1: 0.037,
          curve: "natural"
        }),
        Plot.line([[131000, 0.0351,], [10000000, 0.0351,]], {
          x1: 131000,
          y1: 0.0351,
        }),

        Plot.line([[3000, 0.049], [18000, 0.0361], [510000, 0.032]], {
          x0: 3200,
          y0: 0.049,
          x1: 18000,
          y1: 0.037,
          curve: "catmull-rom"
        }),
        Plot.line([[510000, 0.032,], [10000000, 0.032,]], {
          x1: 300000,
          y1: 0.032,
        }),

        Plot.line([[3000, 0.0485], [25000, 0.032], [1050000, 0.0282]], {
          x0: 3000,
          y0: 0.0485,
          x1: 25000,
          y1: 0.032,
          curve: "catmull-rom"
        }),
        Plot.line([[1050000, 0.0282,], [10000000, 0.0282,]], {
          x1: 1050000,
          y1: 0.0282,
        }),

        Plot.line([[3000, 0.0459], [19100, 0.030], [100000, 0.0252], [1000000, 0.0233]], {
          x0: 3000,
          y0: 0.0459,
          x1: 19100,
          y1: 0.030,
          curve: "catmull-rom"
        }),
        Plot.line([[1000000, 0.0233,], [10000000, 0.0233,]], {
          x1: 1000000,
          y1: 0.0233,
        }),

        Plot.line([[3000, 0.0445], [20000, 0.028], [300000, 0.0208], [2000000, 0.0196]], {
          x0: 3000,
          y0: 0.0445,
          x1: 20000,
          y1: 0.028,
          curve: "catmull-rom"
        }),
        Plot.line([[2000000, 0.0196,], [10000000, 0.0196,]], {
          x1: 2000000,
          y1: 0.0196,
        }),

        Plot.line([[200000, 0.0203], [510000, 0.0192], [1600000, 0.0186]], {
          x0: 200000,
          y0: 0.0203,
          x1: 510000,
          y1: 0.0192,
          curve: "catmull-rom"
        }),
        Plot.line([[1600000, 0.0186,], [10000000, 0.0186,]], {
          x1: 1600000,
          y1: 0.0186,
        }),

        Plot.line([[24900, 0.0261], [200000, 0.0193], [2050000, 0.0174]], {
          x0: 25000,
          y0: 0.0261,
          x1: 200000,
          y1: 0.019,
          curve: "natural"
        }),
        Plot.line([[2050000, 0.0174,], [10000000, 0.0174,]], {
          x1: 1600000,
          y1: 0.0174,
        }),

        Plot.line([[8750, 0.0329], [25000, 0.0256], [45000,0.0229],[200000, 0.0181],[3500000, 0.0159]], {
          x0: 8750,
          y0: 0.0329,
          x1: 25000,
          y1: 0.0256,
          curve: "natural"
        }),
        Plot.line([[3500000, 0.0159,], [10000000, 0.0159,]], {
          x1: 3500000,
          y1: 0.0159,
        }),

        Plot.line([[45000, 0.0224],[200000, 0.0171], [1200000, 0.0145], [7100000, 0.0138]], {
          x0: 45000,
          y0: 0.0224,
          x1: 200000,
          y1: 0.0171,
          curve: "natural"
        }),
        Plot.line([[7100000, 0.0138,], [10000000, 0.0138,]], {
          x1: 7100000,
          y1: 0.0138,
        }),

        Plot.line([[22000, 0.0257], [190000, 0.0164], [1600000, 0.013], [7000000, 0.012]], {
          x0: 22000,
          y0: 0.0257,
          x1: 190000,
          y1: 0.0164,
          curve: "natural"
        }),
        Plot.line([[7000000, 0.012,], [10000000, 0.012]], {
          x1: 7000000,
          y1: 0.012,
        }),

        Plot.line([[190000, 0.0162], [1600000, 0.012], [6000000, 0.0109]], {
          x0: 190000,
          y0: 0.0162,
          x1: 1600000,
          y1: 0.012,
          curve: "natural"
        }),
        Plot.line([[6000000, 0.0109,], [10000000, 0.0109]], {
          x1: 6000000,
          y1: 0.0109,
        }),

        Plot.line([[3050, 0.043], [8800, 0.0319], [190000, 0.0158], [2490000, 0.010]], {
          x0: 3050,
          y0: 0.0439,
          x1: 8800,
          y1: 0.0319,
          curve: "natural"
        }),

        Plot.text([0.075], {
          y: (d) => d,
          x: [8500000],
          text: ['Relative Roughness E/D  .05'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0673], {
          y: (d) => d,
          x: [8500000],
          text: ['.04'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.059], {
          y: (d) => d,
          x: [8500000],
          text: ['.03'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0505], {
          y: (d) => d,
          x: [8500000],
          text: ['.02'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.046], {
          y: (d) => d,
          x: [8500000],
          text: ['.015'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0395], {
          y: (d) => d,
          x: [8500000],
          text: ['.01'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0364], {
          y: (d) => d,
          x: [8500000],
          text: ['.008'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.033], {
          y: (d) => d,
          x: [8500000],
          text: ['.006'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0293], {
          y: (d) => d,
          x: [8500000],
          text: ['.004'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0242], {
          y: (d) => d,
          x: [8500000],
          text: ['.002'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0203], {
          y: (d) => d,
          x: [8500000],
          text: ['.001'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.01922], {
          y: (d) => d,
          x: [8500000],
          text: ['.0008'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.018], {
          y: (d) => d,
          x: [8500000],
          text: ['.0006'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0165], {
          y: (d) => d,
          x: [8500000],
          text: ['.0004'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0144], {
          y: (d) => d,
          x: [8500000],
          text: ['.0002'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0124], {
          y: (d) => d,
          x: [8500000],
          text: ['.0001'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
        Plot.text([0.0113], {
          y: (d) => d,
          x: [8500000],
          text: ['E/D .00005'],
          stroke: "var(--plot-background)",
          fill: "currentColor",
          fontWeight: "bold",
          lineAnchor: "top",
          textAnchor: "end",
          dy: "-2",
          dx: "10"
        }),
      ]
    });
    containerRef.current.append(plot);
    return () => plot.remove();
  }, [values]);

  return <div ref={containerRef} />;
}