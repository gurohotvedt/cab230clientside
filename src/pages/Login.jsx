import React, { useState } from "react"

const API_URL="http://131.181.190.87:3000"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPage, setErrorPage] = useState("");
  const [successPage, setSuccessPage] = useState("");


  function login() {
    setEmail("")
    setPassword("")
    const url = `${API_URL}/user/login`

    return fetch(url, {
      method: "POST", 
      headers: { accept: "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({ email: email, password: password})
    }, errorPage)
    .then(res => res.json())
    .then(res => {
      if (res.error === true){
        setErrorPage(res.message)
      }
      else {
        localStorage.setItem("token", res.token)   // save token in LocalStorage
        setSuccessPage("Login successful!")
        window.location.reload();  // must reload page to be able to see "Logout" in the navigation bar.
      }
    })
  }

  // login successful
  if (successPage !== "" ) {
    return (
      <center>
        <p>
          {successPage}
        </p>
      </center>
    )
  }

  // login unsuccessful
  if (errorPage !== "") {
    return (
      <center>
    <div>
      <h2>Login</h2>
      <p> {errorPage}. Try again </p>
      <form>
        <label htmlFor="email">E-mail: </label>
        <input 
        id="email" 
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange = {(event) => {
          setEmail(event.target.value);
        }} />
      </form>
      <form>
        <label htmlFor="password">Password: </label>
          <input 
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange = {(event) => {
            setPassword(event.target.value);
          }}
          />
      </form>
      <button onClick={login}>Login</button>
    </div>
    </center>
    )
  }


  // page that shows when a user enters the page
  return (
    <center>
    <div>
      <h2>Login</h2>
      <form>
        <label htmlFor="email">E-mail: </label>
        <input 
        id="email" 
        name="email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange = {(event) => {
          setEmail(event.target.value);
        }} />
      </form>
      <form>
        <label htmlFor="password">Password: </label>
          <input 
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange = {(event) => {
            setPassword(event.target.value);
          }}
          />
      </form>
      <button onClick={login}>Login</button>
    </div>
    </center>
  )
}
