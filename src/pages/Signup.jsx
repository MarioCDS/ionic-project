import {
  IonButton,
  IonCard,
  IonHeader,
  IonTitle,
  IonInput,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Style.css";

import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  useIonViewWillEnter(() => {}, []);
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signUp } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    await signUp(emailRef.current.value, passwordRef.current.value);
  }

  return (
    <div className="page">
      <IonHeader collapse="condense"></IonHeader>
      <IonCard className="card">
        <IonTitle className="createTitle">Sign up</IonTitle>
        <form onSubmit={handleSubmit}>
          <IonInput
            type="text"
            id="email"
            className="createInput"
            placeholder="Enter your email"
            required
            ref={emailRef}
          ></IonInput>
          <IonInput
            type="password"
            id="password"
            className="createInput"
            placeholder="Enter your password"
            required
            ref={passwordRef}
          ></IonInput>
          <IonButton
            type="submit"
            style={{
              marginTop: "12px",
              maxWidth: "150px",
            }}
          >
            Finish
          </IonButton>
        </form>
      </IonCard>
    </div>
  );
}
