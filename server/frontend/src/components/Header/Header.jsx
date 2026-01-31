import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
    const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin+"/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });
  
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out "+username+"...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };
    
//The default home page items are the login details panel
let home_page_items =  <div></div>

//Gets the username in the current session
let curr_user = sessionStorage.getItem('username')

//If the user is logged in, show the username and logout option on home page
if ( curr_user !== null &&  curr_user !== "") {
    home_page_items = <div className="input_panel">
      <text className='username'>{sessionStorage.getItem("username")}</text>
    <a className="nav_item" href="/djangoapp/logout" onClick={logout}>Logout</a>
  </div>
}
    return (
        <div>
          <nav className="navbar navbar-expand-lg" style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
            padding: '1rem 2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
          }}>
            <div className="container-fluid">
              <h2 style={{
                color: '#00d4ff',
                fontWeight: 700,
                margin: 0,
                fontSize: '1.8rem',
                letterSpacing: '-0.5px'
              }}>Best Cars</h2>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link" style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontWeight: 500,
                      padding: '0.5rem 1.2rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }} href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontWeight: 500,
                      padding: '0.5rem 1.2rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }} href="/about">About Us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontWeight: 500,
                      padding: '0.5rem 1.2rem',
                      borderRadius: '8px',
                      transition: 'all 0.3s ease'
                    }} href="/contact">Contact Us</a>
                  </li>
                </ul>
                <span className="navbar-text">
                  <div className="loginlink" id="loginlogout">
                  {home_page_items}
                  </div>
                  </span>
              </div>
            </div>
          </nav>
        </div>
    )
}

export default Header
