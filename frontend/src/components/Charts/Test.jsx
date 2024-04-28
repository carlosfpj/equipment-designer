import * as d3 from "d3";
import { useEffect } from "react";

export default function ChartTest({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginBottom = 30,
  marginRight = 20,
  marginLeft = 40,
}) {

    //here I declare the X scale.
    // const xScale = d3.scaleLinear(
    //           [0,100],
    //           [marginLeft, width - marginRight]
    //         )

    const xScale = d3.scaleLog([100,100000], [marginLeft, width]);

    //here I declare the Y scale
    const yScale = d3.scaleLinear(
              [0,100],
              [height - marginBottom, marginTop]
    )

    //Create the horizontal and vertical axis
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale);

    const line = d3.line((d,i) => xScale(i),yScale);

    useEffect(() => {
      d3.select(".x-axis")
        .call(xAxis)
        .selectAll("text")
        .attr("font-size", "14px");

      d3.select(".y-axis")
        .call(yAxis)
        .selectAll("text")
        .attr("font-size", "14px");
    }, [xAxis, yAxis]);

  return (
    <svg width={width} height={height}>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        d={line(data)}
        />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d,i) => (<line key={i} cx={xScale(i)} cy={yScale(d)} r="2.5" />))}
      </g>
      <g className="x-axis" transform={`translate(0,${height - marginBottom})`}></g>
      <g className="y-axis" transform={`translate(${marginLeft}, 0)`}></g>
    </svg>
  );
}