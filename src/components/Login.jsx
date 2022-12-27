import { IonButton, IonIcon, IonInput, IonLabel, IonToast } from "@ionic/react";
import { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { logOutOutline, logInOutline } from "ionicons/icons";
import "../pages/Style.css";
import { personAdd } from "ionicons/icons";
import { useHistory } from "react-router";

export default function Login() {
  const historyUse = useHistory();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [display, setDisplay] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      setError("");
      setLoading(true);
      console.log();
      await login(emailRef.current.value, passwordRef.current.value);
    } catch {
      setError("Failed to log in");
    }
    setShowLoginToast(true);
    setLoading(false);
  }

  function handleLogout() {
    logout();
    setShowLogoutToast(true);
    setDisplay(false);
  }

  function showLogin() {
    if (!currentUser) {
      if (display) {
        return (
          <>
            {error ? <IonLabel className="error">{error}</IonLabel> : null}
            <form onSubmit={handleSubmit} className="loginForm">
              <IonIcon
                style={{
                  marginRight: "15px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDisplay(false);
                }}
                icon={logOutOutline}
              />
              <IonInput
                required
                className="loginInput"
                placeholder="Email"
                type="email"
                name="email"
                ref={emailRef}
              />

              <IonInput
                required
                className="loginInput"
                type="password"
                name="password"
                placeholder="Password"
                ref={passwordRef}
              />

              <IonButton
                disabled={loading}
                type="submit"
                style={{ maxWidth: "150px" }}
              >
                {loading ? "Loading..." : "Login"}
              </IonButton>
            </form>
          </>
        );
      } else {
        return (
          <div>
            <IonIcon
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                fontSize: "26px",
                color: "#333",
              }}
              onClick={() => {
                setDisplay(true);
              }}
              icon={logInOutline}
            />
            <NavLink to="/signup">
              <IonIcon
                style={{
                  marginLeft: "50px",
                  cursor: "pointer",
                  fontSize: "26px",
                  color: "#333",
                }}
                icon={personAdd}
              />
            </NavLink>
          </div>
        );
      }
    } else {
      return (
        <div
          style={{
            textAlign: "center",
          }}
        >
          <IonButton
            onClick={handleLogout}
            type="submit"
            style={{ maxWidth: "150px", margin: "0 10px" }}
          >
            Logout
          </IonButton>
          <NavLink to="/create">
            <IonButton>Create</IonButton>
          </NavLink>
        </div>
      );
    }
  }

  return (
    <div>
      {showLogin()}
      <IonToast
        isOpen={showLogoutToast}
        onDidDismiss={() => setShowLogoutToast(false)}
        message="Successfully logged out"
        duration={1000}
      />
      <IonToast
        isOpen={showLoginToast}
        onDidDismiss={() => setShowLoginToast(false)}
        message={
          currentUser?._delegate?.email
            ? `Hello, ${currentUser._delegate.email}`
            : null
        }
        duration={1000}
      />
    </div>
  );
}
