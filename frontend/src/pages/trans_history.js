import "../styles/shop.css";
import { MainNav } from "../components/nav";
import * as d3 from "d3";
import { useEffect, useRef } from "react";
import "../styles/trans_history.css";

const testX = [];
const testY = [];
const testN = 10;

for (let i = 0; i < testN; i++) {
  testX.push(i);
}

for (let i = 0; i < testX.length; i++) {
  testY.push(Math.random() * 100);
}
{
  /*As i said, i use some parts of css quite lag can not load so i use this */
}
const TransactionHistory = () => {
  const headerStyle = {
    fontFamily: '"Abril Fatface", sans-serif',
    fontSize: "2.5em",
    textAlign: "center",
    color: "#044b4d",
    backgroundColor: "#f8f4eb",
    padding: "15px 40px",
    borderRadius: "50px",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    margin: "30px auto",
    marginTop: "110px",
  };

  const chartRef = useRef(null);

  useEffect(() => {
    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    // Set up dimensions
    const width = 600;
    const height = 300;
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

  const defaultHistory = [];

  return (
    <div>
      <MainNav />

      <div id="transaction-history" className="main-content">
        <h1 style={headerStyle}>YOUR TRANSACTION HISTORY</h1>
        <p>View your recent spendings:</p>

        <div id="chart-container">
          <div ref={chartRef}></div>
        </div>
      </div>

      <div id="transaction-history-info">
        <h2>Transaction History</h2>
        <p>
          This is a simple line chart showing your recent transactions. The
          X-axis represents the transaction number, and the Y-axis represents
          the amount spent in each transaction.
        </p>
        <p>
          You can use this chart to track your spending habits and make informed
          decisions about your purchases.
        </p>
      </div>

      <div id="transaction-history-list">
        <h2>Recent Transactions</h2>
        <p>Your past transaction is here</p>
        <br />
        <div className="transaction-container">
          {defaultHistory.map((transaction) => (
            <div key={transaction.id} className="transaction-item">
              <img
                src={transaction.img}
                alt={transaction.name}
                className="transaction-img"
              />
              <div>
                <h4>{transaction.name}</h4>
                <p>{transaction.deducted}</p>
                <p>Status: {transaction.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { TransactionHistory };
