import {
  IonContent,
  IonHeader,
  IonInput,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Style.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export default function Create() {
  const editorRef = useRef(null);

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
        <IonLabel>Song Number</IonLabel>
        <IonInput name="number" placeholder="Number"></IonInput>
        <IonLabel>Title:</IonLabel>
        <IonInput name="title" placeholder="Title"></IonInput>
        <IonLabel>Lyrics:</IonLabel>
        <textArea name="title" placeholder="Lyrics"></textArea>
      </IonContent>
    </IonPage>
  );
}
