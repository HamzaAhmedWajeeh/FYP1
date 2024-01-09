import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import back from 'assets/img/back.png';

export default function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const urlEmail = queryParams.get('email') || '';
  const [password, setNewPassword] = useState('');
  const [repeatNewPassword, setRepeatNewPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  }, [urlEmail]);

  const handleResetPassword = async () => {
    try {
      if (password !== repeatNewPassword) {
        console.error('New passwords do not match. Please check and try again.');
        return;
      }

      const response = await fetch('http://localhost:5206/api/ForgotPassword/update-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: urlEmail,
          password: password,
        }),
      });

      if (response.ok) {
        alert('Password reset successful.');

        // Show alert
        window.alert('Password reset successful.');

        // Redirect to the login page
        navigate('/admin/Login');
      } else {
        console.error('Failed to reset password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container">
      <div className="screen reset-password">
        <div className="screen__content">
          <form className="login">
            <Link to="/admin/Login">
              <img src={back} alt="Back" className="login__icon" />
            </Link>
            <h4 className="XYZ">Reset Your Password</h4>
            <div className="login__field">
              <input
                type="email"
                name="email"
                placeholder="Email"
                readOnly
                className="login__input XYZ"
                value={urlEmail}
              />
            </div>

            <div className="login__field">
              <input
                type="password"
                name="password"
                placeholder="New Password"
                required
                className="login__input XYZ"
                value={password}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="login__field">
              <input
                type="password"
                name="repeatNewPassword"
                placeholder="Repeat New Password"
                required
                className="login__input XYZ"
                value={repeatNewPassword}
                onChange={(e) => setRepeatNewPassword(e.target.value)}
              />
            </div>

            <button
              type="button"
              className="login__submit"
              onClick={handleResetPassword}
            >
              Change Password
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
