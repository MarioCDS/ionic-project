import {
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
  useIonViewWillEnter,
} from "@ionic/react";

import { useAuth } from "../contexts/AuthContext";
import "./Style.css";

const Current = () => {
  const { currentSong } = useAuth();

  useIonViewWillEnter(() => {
    console.log(currentSong._id);
  }, [currentSong]);

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
          <h1 className="title">
            {currentSong.Number}: {currentSong.Title}
          </h1>
          <p>{currentSong.Lyrics}</p>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Current;
