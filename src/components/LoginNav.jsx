import React from "react";
import {Link, Redirect} from "react-router-dom";



// logout function
function Logout() {
  localStorage.removeItem("token");
  window.location.reload();  // must reload page when log in to display the logout link
}

// navigation links for (login and register)/logout
export default function LoginNav() {

  // if logged in
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
