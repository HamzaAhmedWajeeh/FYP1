import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../assets/css/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5206/api/Admin_Cr/Login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Data received from API:', data);

        const { role_id, userProfile } = data;
        localStorage.setItem('userProfile', JSON.stringify(userProfile));

        switch (role_id) {
          case 1:
            navigate("/super/HospitalS", { state: { userProfile } });
            break;
          case 2:
            navigate("/admin/DashH", { state: { userProfile } });
            break;
          case 3:
            navigate("/employee/AppointmentE", { state: { userProfile } });
            break;
          case 4:
            navigate("/doctor/NotificationD", { state: { userProfile } });
            break;
          case 5:
            navigate("/patient/Appointment", { state: { userProfile } });
            break;
          default:
            setShowError(true);
        }
      } else {
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleLogin}>
            <div className="text center">
              <h2 className="XYZ">LIFELINE</h2>
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                value={email}
                required
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                name="pswd"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="button login__submit" type="submit">
              <span className="button__text">Login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <div className="social-icons">{/* Add your social icons here */}</div>
          </div>
          {showError && (
            <p style={{ color: "orange", textAlign: "center", fontWeight: "bold", fontFamily: "'Times New Roman', Times, serif" }}>
              Invalid Credentials. Please Try Again.
            </p>
          )}
          <p style={{ textAlign: "center" }}>
            <Link to="/admin/Forgot" className="forgot_password_login" style={{ color: "#FFF", fontWeight: "bold", fontFamily: "Verdana, Geneva, sans-serif" }}>
              Forgot Password?
            </Link>
          </p>
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