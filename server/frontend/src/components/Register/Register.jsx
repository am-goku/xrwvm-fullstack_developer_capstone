import React, { useState } from "react";
import "./Register.css";
import Header from '../Header/Header';

const Register = () => {
  // State variables for form inputs
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");

  // Redirect to home
  const gohome = () => {
    window.location.href = window.location.origin;
  }

  // Handle form submission
  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin + "/djangoapp/register";

    // Send POST request to register endpoint
    const res = await fetch(register_url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "userName": userName,
        "password": password,
        "firstName": firstName,
        "lastName": lastName,
        "email": email
      }),
    });

    const json = await res.json();
    if (json.status) {
      // Save username in session and reload home
      sessionStorage.setItem('username', json.userName);
      window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
  };

  return (
    <div>
      <Header />
      <div className="register_page">
        <div className="register_container">
          <div className="header">
            <span className="text">Create Account</span>
            <a href="/" onClick={() => { gohome() }}>
              <svg className="close_btn" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </a>
          </div>

          <form onSubmit={register}>
            <div className="inputs">
              <div className="input">
                <input type="text" name="username" placeholder="Username" className="input_field" onChange={(e) => setUserName(e.target.value)} />
              </div>
              <div className="input">
                <input type="text" name="first_name" placeholder="First Name" className="input_field" onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div className="input">
                <input type="text" name="last_name" placeholder="Last Name" className="input_field" onChange={(e) => setlastName(e.target.value)} />
              </div>
              <div className="input">
                <input type="email" name="email" placeholder="Email" className="input_field" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="input">
                <input name="psw" type="password" placeholder="Password" className="input_field" onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>
            <div className="submit_panel">
              <input className="submit" type="submit" value="Create Account" />
            </div>
            <a className="login_link" href="/login">Already have an account? Login</a>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;