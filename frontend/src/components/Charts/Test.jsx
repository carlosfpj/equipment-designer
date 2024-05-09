import * as d3 from "d3";
import { useEffect, useState } from "react";

export default function ChartTest({
  data,
  width = 640,
  height = 400,
  marginTop = 20,
  marginBottom = 30,
  marginRight = 20,
  marginLeft = 40,
}) {

  // const data = [
  //     { x: 100, y: 3 },
  //     { x: 300, y: 9 },
  //     { x: 1600, y: 50 },
  //     { x: 13000, y: 0.5 },
  //     { x: 40000, y: 1.5 },
  //     { x: 100000, y: 3.7 },
  //   ]

  console.log(data);

    //here I declare the X scale.
    const xScale = d3.scaleLog([100,100000], [marginLeft, width]);

    //here I declare the Y scale
    const yScale = d3.scaleLog([0.5,50], [height - marginBottom, marginTop]);

    //Create the horizontal and vertical axis
    const xAxis = d3.axisBottom(xScale).tickSizeOuter(0);
    const yAxis = d3.axisLeft(yScale);

    //here i write the line creator
    const line = d3.line().x(d => xScale(d.i)).y(d => yScale(d.v));

    useEffect(() => {
      d3.select(".x-axis")
        .call(xAxis)
        .selectAll("text")
        .attr("font-size", "12px");

      d3.select(".y-axis")
        .call(yAxis)
        .selectAll("text")
        .attr("font-size", "12px");
    }, [xAxis, yAxis]);

  return (
    <svg width={width} height={height}>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[0])}/>
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d,i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[1])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[2])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[3])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[4])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[5])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[6])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[7])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[8])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[9])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[10])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[11])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[12])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[13])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[14])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>
      <path fill="none" stroke="currentColor" strokeWidth="1.5" d={line(data[15])} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<line key={i} cx={xScale(d)} cy={yScale(i)} r="2.5" />))}
      </g>


      <g className="x-axis" transform={`translate(0,${height - marginBottom})`}></g>
      <g className="y-axis" transform={`translate(${marginLeft}, 0)`}></g>
    </svg>
  );
}