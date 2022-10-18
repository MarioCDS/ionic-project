import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Style.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";

export default function Create() {
  async function handleCreate() {
    const docRef = doc(db, "Lyrics", "newSong2");

    await setDoc(docRef, {
      Number: 4,
      Title: "New Song2",
      Lyrics: "New Song Lyrics",
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Create</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Create</IonTitle>
          </IonToolbar>
        </IonHeader>
        <button onClick={handleCreate}>Create test</button>
      </IonContent>
    </IonPage>
  );
}
