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

    // Clear previous chart
    d3.select(chartRef.current).selectAll("*").remove();

    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };

    const amounts = transactions.map((tran) => {
      const amount = tran.amount_eth || 0;
      const qty = tran.quantity || 1;
      return amount * qty;
    });

    const x = d3
      .scaleLinear()
      .domain([0, transactions.length - 1])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(amounts) || 1])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((d, i) => x(i))
      .y((d) => y(d));

    const svg = d3
      .select(chartRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    svg
      .append("path")
      .datum(amounts)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2)
      .attr("d", line);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(amounts.length));

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));
  }, [transactions]);

  const totalSpent = transactions.reduce((acc, tran) => {
    const amount = tran.amount_eth || 0;
    const qty = tran.quantity || 1;
    return acc + amount * qty;
  }, 0);

  return (
    <div>
      <MainNav />

      <div className="main-content" id="transaction-history">
        <h1 style={{
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
          marginTop: "110px"
        }}>
          YOUR TRANSACTION HISTORY
        </h1>

        <p style={{ textAlign: "center" }}>View your recent spendings:</p>

        <div id="chart-container">
          <div ref={chartRef}></div>
        </div>

        <h2 style={{ textAlign: "center", color: "#044b4d" }}>
          Total spent: {totalSpent.toFixed(4)} ETH
        </h2>
      </div>

      <div id="transaction-history-info">
        <h2>Transaction History</h2>
        <p>This is a simple line chart showing your recent transactions. The X-axis represents the transaction number, and the Y-axis represents the amount spent in each transaction (including quantity).</p>
      </div>

      <div id="transaction-history-list">
        <h2>Recent Transactions</h2>
        <p>Your past transaction is here</p>
        <br />
        <div className="transaction-container">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="error">{error}</p>
          ) : transactions.length === 0 ? (
            <p>No transaction found.</p>
          ) : (
            transactions.map((transaction) => {
              const product = transaction.product || {};
              return (
                <div key={transaction.id} className="transaction-item">
                  <img
                    src={product.img || "/default-product.png"}
                    alt={product.name || "Product Image"}
                    className="transaction-img"
                  />
                  <div>
                    <h4>{product.name || "Unnamed Product"}</h4>
                    <p><b>{transaction.amount_eth} ETH</b></p>
                    <p>Status: {transaction.status || "Confirmed"}</p>
                    <p style={{ fontSize: "0.95em", color: "#888" }}>
                      {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export { TransactionHistory };
