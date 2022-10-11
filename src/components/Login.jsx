import {
  IonButton,
  IonIcon,
  IonInput,
  IonLabel,
  IonToast,
  useIonViewWillEnter,
} from "@ionic/react";
import { useRef, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { logOutOutline, logInOutline } from "ionicons/icons";

const style = {
  flex: 1,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "90%",
  textAlign: "center",
};
const formStyle = {
  backgroundColor: "rgb(247, 247, 247)",
  borderRadius: "10px",
  border: "1px solid rgb(220, 220, 220)",
  marginRight: "15px",
};

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, logout, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [display, setDisplay] = useState(false);
  const [showLogoutToast, setShowLogoutToast] = useState(false);
  const [showLoginToast, setShowLoginToast] = useState(false);

  useIonViewWillEnter(() => {
    if (currentUser) {
      setLoggedIn(true);
      console.log(currentUser._delegate.email);
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");

    setLoading(true);

    try {
      setError("");
      setLoading(true);
      console.log(
        await login(emailRef.current.value, passwordRef.current.value)
      );
      setLoggedIn(true);
    } catch {
      setError("Failed to log in");
    }
    setShowLoginToast(true);
    setLoading(false);
  }

  function handleLogout() {
    logout();
    setShowLogoutToast(true);
    setLoggedIn(false);
    setDisplay(false);
  }

  function showLogin() {
    if (!loggedIn) {
      if (display) {
        return (
          <>
            {error ? <IonLabel>{error}</IonLabel> : null}
            <form style={style} onSubmit={handleSubmit} className="loginForm">
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
                style={formStyle}
                placeholder="Email"
                type="email"
                name="email"
                ref={emailRef}
              />

              <IonInput
                required
                style={formStyle}
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
          <IonIcon
            style={{ marginLeft: "10px", cursor: "pointer" }}
            onClick={() => {
              setDisplay(true);
            }}
            icon={logInOutline}
          />
        );
      }
    } else {
      return (
        <>
          <IonButton
            onClick={handleLogout}
            type="submit"
            style={{ maxWidth: "150px" }}
          >
            Logout
          </IonButton>
        </>
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
