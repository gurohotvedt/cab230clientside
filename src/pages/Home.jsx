import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <Hero />
      
    </main>
  );
}

// Home page
const Hero = () => (
  <section className="hero">
    {/* content for the hero */}
    <div className="hero__content">
      <h1 className="hero__title">Stock Prices</h1>
      <p className="hero__subtitle">Welcome to the Stock Analyst portal.
      </p>
      <p className="hero__subtitle"> Click "Stocks" to see all available companies and stocks, optionally
      filtered by an industry. For getting the latest price information by stock symbol, click "Quote". If you want to see a specific time
      period for a partiucular stock, choose "Price History" which is an authenticated route.</p>
      <p className="hero__subtitle">To be able to get to Price History, you must first register and log in.</p>

      <Link to="/stocks">Stocks</Link>
      <Link to="/quote">Quote</Link>
      <Link to ="/pricehistory">Price History (Authenticated)</Link>
    </div>
  </section>
);


