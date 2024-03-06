import { Checkbox } from "@material-ui/core";
import "./index.css";
const Login = () => {
  return (
    <div className="login-page-main-container">
      <div className="login-page-container1">
        <h4 className="login-page-heading">Login</h4>
        <div className="login-page-input-container">
          <label className="login-page-label">
            Username or email address *
          </label>
          <input className="login-page-input" />
        </div>
        <div className="login-page-input-container">
          <label className="login-page-label">Password *</label>
          <input className="login-page-input" />
        </div>
        <div className="login-page-checkbox-container">
          <Checkbox className="login-page-checkbox" />
          <label className="login-page-label">Remember me</label>
        </div>
        <button className="login-page-button">Login</button>
        <p className="login-page-text1 login-page-text">Lost your Password?</p>
      </div>
      <div className="login-page-container1">
        <h4 className="login-page-heading">Register</h4>
        <div className="login-page-input-container">
          <label className="login-page-label">Email *</label>
          <input className="login-page-input" />
        </div>
        <p className="login-page-text">
          A link to set a new password will be sent to your email address.
        </p>
        <p className="login-page-text">
          Your personal data will be used to support your experience throughout
          this website, to manage access to your account, and for other purposes
          described in our privacy policy.
        </p>
        <buton className="login-page-button">Register</buton>
      </div>
    </div>
  );
};
export default Login;
