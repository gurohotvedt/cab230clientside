import React from "react";
import {Link, Redirect} from "react-router-dom";


function Logout() {
  localStorage.removeItem("token");
  window.location.reload();
  // <Redirect to="/login" />  //Tried to redirect something here
}

// navigation links
export default function LoginNav() {

  if ("token" in localStorage) {
    return (
      <nav id="login">
        <ul>
          <li>
            <Link to="/home" onClick={Logout} >Logout</Link>
          </li>  
        </ul>
      </nav>
    );

  } 
  else { 
    return (
      <nav id="login">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
  
          <li>
          <Link to="/register">Register</Link>
          </li>
          
        </ul>
      </nav>
    );
  }
  
}
