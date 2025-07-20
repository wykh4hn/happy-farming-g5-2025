// TransactionHistory.js
import "../styles/shop.css";
import "../styles/trans_history.css";
import { MainNav } from "../components/nav";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get("/api/purchases");
        setTransactions(response.data.content || []);
      } catch (err) {
        console.error("Failed to fetch transaction history:", err);
        setError("Failed to load transaction history.");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    if (!transactions.length || !chartRef.current) return;

    const ethData = transactions.map((t) => t.amount_eth || 0);
    const timeData = transactions.map((t) => t.timestamp || t.date || "");

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 40, left: 50 };

    d3.select(chartRef.current).selectAll("*").remove();

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    const x = d3
      .scalePoint()
      .domain(timeData)
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(ethData)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((_, i) => x(timeData[i]))
      .y((d) => y(d));

    svg
      .append("path")
      .datum(ethData)
      .attr("fill", "none")
      .attr("stroke", "#0077cc")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickFormat((d) => d.slice(0, 10)))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [transactions]);

  return (
    <div>
      <MainNav />
      <div className="main-content" id="transaction-history">
        <h1>YOUR TRANSACTION HISTORY</h1>
        <p>View your recent spendings:</p>
        <div id="chart-container">
          <div ref={chartRef}></div>
        </div>
      </div>

      <div id="transaction-history-list">
        <h2>Recent Transactions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className="transaction-container">
            {transactions.map((t) => (
              <div key={t.id} className="transaction-item">
                <h4>{t.product_name || "Product"}</h4>
                <p>Amount: {t.amount_eth} ETH</p>
                <p>Status: {t.status || "Confirmed"}</p>
                <p>Hash: {t.transaction_hash}</p>
                <p>Date: {t.timestamp || t.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { TransactionHistory };