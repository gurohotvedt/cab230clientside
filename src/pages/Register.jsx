import React, {useState} from "react";

const API_URL="http://131.181.190.87:3000"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorPage, setErrorPage] = useState("");
  const [successPage, setSuccessPage] = useState("");
  
  function register () {
    setEmail("")
    setPassword("")
    const url = `${API_URL}/user/register`

    return fetch(url, {
      method: "POST", 
      headers: { accept: "application/json", "Content-Type": "application/json"},
      body: JSON.stringify({ email: email, password: password})
    }, errorPage, successPage)
    .then (res => res.json())
    .then (data => {
      if ( data.error === true) {
        setErrorPage(data.message)
      }
      else {
        setSuccessPage(data.message)
      }
    })

  }

  if (successPage !== "") {
    return (
      <center>
      <p>{successPage}</p>
      </center>
    )
    
  }

  if (errorPage !== "") {
    return (
    
    <center>
    <div>
      <h2>Register</h2>
      <p>{errorPage}</p>
      <form>
        <label htmlFor="email">E-mail: </label>
        <input 
        id="email" 
        name="email"
        type="text"
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
          value={password}
          onChange = {(event) => {
            setPassword(event.target.value);
          }}
          />
      </form>
      <button onClick={register}>Register</button>
    </div>
    </center>
    )
    }
    
return (
      <center>
    <div>
      <h2>Register</h2>
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
          placeholder="Enter a password"
          value={password}
          onChange = {(event) => {
            setPassword(event.target.value);
          }}
          />
      </form>
      <button onClick={register}>Register</button>
    </div>
    </center>
  )
  

}
