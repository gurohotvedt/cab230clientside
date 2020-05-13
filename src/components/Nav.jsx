import React from "react";
import {Link} from "react-router-dom";

// navigation links
export default function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
        <Link to="/stocks">Stocks</Link>
        </li>

        <li>
        <Link to="/quote">Quote</Link>
        </li>

        <li>
          <Link to="/pricehistory">Price History (Authenticated)</Link>
        </li>
        
      </ul>
    </nav>

    
  );
}
