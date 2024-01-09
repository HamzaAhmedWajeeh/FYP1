import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import back from 'assets/img/back.png';

export default function Forgot() {
  const [email, setEmail] = useState('');

  const handleVerifyEmail = async () => {
    try {
      const response = await fetch('http://localhost:5206/api/ForgotPassword/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (response.ok) {
        // Handle success, maybe show a success message or redirect
        alert('Email sent for verification.');
      } else {
        // Handle error, maybe show an error message
        alert('Failed to verify email. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="screen forgot">
        <div className="screen__content">
          <form className="login">
            <Link to="/admin/Login">
              <img src={back} alt="Back" className="login__icon" />
            </Link>

            <label htmlFor="chk" aria-hidden="true" className="login__field">
              <h3 className="XYZ">Verify Email to Change Password</h3>
            </label>

            <div className="login__field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                required=""
                className="login__input XYZ"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="login__submit"
              onClick={handleVerifyEmail}
            >
              Verify Email
              <span className="button__icon">&#10148;</span>
            </button>
          </form>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
}
