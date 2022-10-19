import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import LyricsForm from "../components/LyricsForm";
import "./Style.css";

export default function Create() {
  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <div className="page">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Create</IonTitle>
            </IonToolbar>
          </IonHeader>
          <LyricsForm mode="edit" />
        </div>
      </IonContent>
    </IonPage>
  );
}
