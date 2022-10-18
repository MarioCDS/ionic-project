import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";

import { useAuth } from "../contexts/AuthContext";
import "./Style.css";

const Current = () => {
  const { currentSong } = useAuth();

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Current</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard className="card">
          <h1 className="title">{currentSong.Title}</h1>
          <div dangerouslySetInnerHTML={{ __html: currentSong.Lyrics }}></div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Current;
