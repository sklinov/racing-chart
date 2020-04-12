import React, { useRef, useEffect } from "react";
import {
  select,
  scaleBand,
  scaleLinear,
  ValueFn,
  easeLinear,
  axisTop,
  axisBottom,
} from "d3";
import { DataFormat } from "./racing-chart-d3-wrapper";
import { useResizeObserver } from "../../utils/resizingTool";
import { getRegionColor } from "../../utils";
import css from "./racing-chart-d3.module.scss";

export interface RacingBarChartD3Props {
  data: DataFormat[];
}

const LABEL_WIDTH = 100;

export const RacingBarChartD3 = (props: RacingBarChartD3Props) => {
  const { data } = props;

  const svgRef = useRef(null);
  const wrapperRef = useRef(null);
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    if (!data) return;
    if (!dimensions) return;
    const svg = select(svgRef.current);

    const yScale = scaleBand()
      .paddingInner(0.3)
      .domain(data.map((entry, index) => entry.item as string))
      .range([30, dimensions.height]);

    const xScale = scaleLinear()
      .domain([0, Math.max(...data.map((item) => item.data))])
      .range([LABEL_WIDTH, dimensions.width - LABEL_WIDTH * 2]);

    const xAxisScale = scaleLinear()
      .domain([0, Math.max(...data.map((item) => item.data))])
      .range([LABEL_WIDTH, dimensions.width - LABEL_WIDTH]);

    svg.attr("viewBox", "0 0 800 640");

    const keyF: ValueFn<any, any, string> = function (
      this,
      entry,
      index,
      groups
    ) {
      return entry.item;
    };

    svg.style("background-color", "#fafafa").style("padding", "20px");
    
    // X-Axis
    
    svg.selectAll(".x-axis").remove();
    svg.selectAll(".x-axis-bottom").remove();
    svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0,20)")
      .style("font-size", "12")
      .call(axisTop(xAxisScale).ticks(5).tickSize(-10))
      .selectAll("text")
      .attr("fill", "#9e9e9e")
      .selectAll('.tick')
      .style('opacity','0.5');
    
      svg
      .append("g")
      .attr("class", "x-axis-bottom")
      .attr("transform", `translate(0,${dimensions.height+20})`)
      .style("font-size", "0")
      .call(axisBottom(xAxisScale).ticks(5).tickSize(-10))
      .selectAll("text")
      .attr("fill", "#9e9e9e")

    // Data bars
    svg
      .selectAll(".bar")
      .data<DataFormat>(data, keyF)
      .join("rect")
      .attr("fill", (entry) => getRegionColor(entry.region))
      .attr("class", "bar")
      .attr("x", LABEL_WIDTH)
      .attr("rx", 5)
      .attr("ry", 5)
      .attr("height", yScale.bandwidth())
      .transition()
      // .attr("duration", "200")
      .attr("width", (entry) => xScale(entry.data))
      .attr("y", (entry) => yScale(entry.item) as number)
      .ease(easeLinear);

    // Labels of data
    svg
      .selectAll(`.${css.label}`)
      .data<DataFormat>(data, keyF)
      .join("text")
      .text((entry) =>
        Number(entry.data).toLocaleString("ch-CH", { useGrouping: true })
      )
      .attr("fill", (entry) => getRegionColor(entry.region))
      .attr("class", css.label)
      .attr("x", (entry) => xScale(entry.data) + LABEL_WIDTH + 10)
      .transition()
      // .attr("duration", "200")
      .attr(
        "y",
        (entry, index) =>
          (yScale(entry.item) as number) + yScale.bandwidth() / 2
      )
      .ease(easeLinear);

    // Labels of countries
    svg
      .selectAll(`.${css.countryLabel}`)
      .data<DataFormat>(data, keyF)
      .join("text")
      .text((entry) => entry.item)
      .attr("class", css.countryLabel)
      .attr("x", (entry) => xScale(entry.data))
      .transition()
      // .attr("duration", "200")
      .attr(
        "y",
        (entry, index) =>
          (yScale(entry.item) as number) + yScale.bandwidth() / 2
      )
      .ease(easeLinear);

    // Flags of countries
    svg
      .selectAll(".countryFlag")
      .data<DataFormat>(data, keyF)
      .attr("class", "countryFlag")
      .enter()
      .append("image")
      .attr("xlink:href", (entry) => entry.image)
      .attr("width", 45)
      .attr("height", 45)
      .attr("x", 0)
      .attr("y", (entry, index) => yScale(entry.item) as number);

  }, [data, dimensions]);

  

  return (
    <div
      ref={wrapperRef}
      style={{ width: "800px", height: "600px", margin: "20px" }}
    >
      <svg ref={svgRef}></svg>
    </div>
  );
};
