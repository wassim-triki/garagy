import { sendPasswordResetEmail } from "firebase/auth";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { auth } from "../../firebase-config";
import "../../styles/forms.css";
import Alert from "../Alert";
import random from "../../utils/random";
const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState({ state: "", text: "" });
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      // throw new Error("Testing error");
      await sendPasswordResetEmail(auth, email);
      setAlert({
        state: "success",
        text: "Password reset email sent!",
        id: random(),
      });
    } catch (err) {
      setError(err.message);
      setAlert({ state: "danger", text: err.message, id: random() });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {});
  return (
    <section className="section password-reset">
      <Alert variant={alert.state} text={alert.text} id={alert.id} />
      <div className="container password-reset">
        <form onSubmit={handleSubmit} className="form-login">
          <h1>Password Reset</h1>

          <div className="form-login__control">
            <input
              onChange={handleEmailChange}
              value={email}
              className="form-login__input"
              type="email"
              placeholder="Your Email"
              required
            />
          </div>

          <button
            className="form-login__submit"
            type="submit"
            disabled={loading}
          >
            Send Password Reset Link
          </button>
          {/* <Link className="forgot-password" to={"/password-reset"}>
            Forgot your password?
          </Link> */}
        </form>
      </div>
    </section>
  );
};

export default PasswordReset;
