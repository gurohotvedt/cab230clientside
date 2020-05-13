import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Link } from "react-router-dom";

// components
import Header from "./components/Header";
import Footer from "./components/Footer";

// pages 
import Home from "./pages/Home";
import Quote from "./pages/Quote";
import Stocks from "./pages/Stocks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SpecificDate from "./pages/PriceHistory";

export default function App() {
  return (
    <Router>
    <div className="App">
      <Header />
      {/* the content */}
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/stocks">
          <Stocks />
        </Route>

        <Route path="/quote">
          <Quote />
        </Route>

        <Route path="/pricehistory">
          <SpecificDate />
        </Route>

        |<Route path="/login">
          <Login />
        </Route>

        <Route path="/register">
          <Register />
        </Route>  

      </Switch>
      <Footer />
    </div>
    </Router>
  );
}
