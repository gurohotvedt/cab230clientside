import React from "react";

import Nav from "./Nav";
import {Link} from "react-router-dom";
import LoginNav from "./LoginNav";

// the header
export default function Header() {
  return (
    <header>
        {/* icon */}
        <div id="icon">
            <Link to="/"> <img src="img/test.jpg" alt="Icon"></img></Link>
        </div>
       <Nav />
       <LoginNav />
    </header>
     
  );
}
