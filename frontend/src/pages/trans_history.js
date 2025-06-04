import "../styles/styles.css";
import "../styles/shop.css";

import { MainNav } from "./nav";

import { Footer } from "./footer";
import { Sidebar } from "./sidebar";

import * as d3 from "d3";
import { useEffect } from "react";

import { useRef } from "react";
// import

const testX = [];
const testY = [];

const testN = 10;

for (let i = 0; i < testN; i++) {
  testX.push(i);
}

for (let i = 0; i < testX.length; i++) {
  testY.push(Math.random() * 100);
}

const TransactionHistory = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Set up dimensions
    const width = 400;
    const height = 200;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    // Create SVG
    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Scales
    const x = d3
      .scaleLinear()
      .domain([d3.min(testX), d3.max(testX)])
      .range([margin.left, width - margin.right]);
    const y = d3
      .scaleLinear()
      .domain([0, d3.max(testY)])
      .range([height - margin.bottom, margin.top]);

    // Line generator
    const line = d3
      .line()
      .x((d, i) => x(testX[i]))
      .y((d) => y(d));

    // Draw line
    svg
      .append("path")
      .datum(testY)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    // X Axis
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(testX.length));

    // Y Axis
    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, []);
  return (
    <div>
      <MainNav />
      <Sidebar />
      <div id="transaction-history" className="main-content">
        <h1>Your recent transactions:</h1>
        <p>View your recent spendings:</p>
        <div ref={chartRef}></div>
        {/* <Chart /> */}
      </div>
      <Footer />
    </div>
  );
};

export { TransactionHistory };
