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

  // Summary stats
  const totalSpent = transactions.reduce((sum, t) => sum + (t.amount_eth || 0), 0);
  const totalTx = transactions.length;

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


  return (
    <div style={{ background: "#f8f9fa", minHeight: "100vh" }}>
      <MainNav />
      <div className="main-content" id="transaction-history" style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
        <h1 style={{ fontWeight: 700, fontSize: "2.2em", color: "#044b4d", marginBottom: 8 }}>Transaction History</h1>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 32 }}>
          <div style={{ background: "#fffbe6", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 24, minWidth: 220 }}>
            <h2 style={{ color: "#0077cc", margin: 0 }}>Total Spent</h2>
            <p style={{ fontSize: "1.5em", fontWeight: 600, margin: "8px 0" }}>{totalSpent.toFixed(3)} ETH</p>
          </div>
          <div style={{ background: "#e6f7ff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 24, minWidth: 220 }}>
            <h2 style={{ color: "#28a745", margin: 0 }}>Transactions</h2>
            <p style={{ fontSize: "1.5em", fontWeight: 600, margin: "8px 0" }}>{totalTx}</p>
          </div>
        </div>
        <div id="chart-container" style={{ background: "#fff", borderRadius: 12, boxShadow: "0 2px 8px #eee", padding: 24, marginBottom: 32 }}>
          <h3 style={{ color: "#0077cc", marginBottom: 16 }}>Spending Over Time</h3>
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

      <div id="transaction-history-list" style={{ maxWidth: 900, margin: "auto", padding: 24 }}>
        <h2 style={{ color: "#044b4d", fontWeight: 700 }}>Recent Transactions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : transactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          <div className="transaction-container" style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {transactions.map((t) => (
              <div key={t.id} className="transaction-item" style={{ background: "#fff", borderRadius: 10, boxShadow: "0 1px 4px #eee", padding: 18, display: "flex", alignItems: "center", gap: 18 }}>
                {t.product && t.product.img ? (
                  <img src={t.product.img} alt={t.product.name} style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, marginRight: 18, border: "1px solid #eee" }} />
                ) : (
                  <div style={{ width: 60, height: 60, background: "#f0f0f0", borderRadius: 8, marginRight: 18, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb" }}>
                    <span style={{ fontSize: 32 }}>🛒</span>
                  </div>
                )}
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: 0, color: "#0077cc" }}>{(t.product && t.product.name) || t.product_name || "Product"}</h4>
                  <p style={{ margin: "4px 0", fontWeight: 500 }}>Amount: <span style={{ color: "#28a745" }}>{t.amount_eth} ETH</span></p>
                  <p style={{ margin: "4px 0" }}>Status: <span style={{ color: t.status === "failed" ? "#dc3545" : "#0077cc" }}>{t.status || "Confirmed"}</span></p>
                  <p style={{ margin: "4px 0" }}>Hash: <span style={{ fontFamily: "monospace", fontSize: "0.95em" }}>{t.transaction_hash}</span></p>
                  <p style={{ margin: "4px 0" }}>Date: {t.timestamp ? new Date(t.timestamp).toLocaleString() : t.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { TransactionHistory };
