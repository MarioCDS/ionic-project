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

  function decodeHtml(html) {
    let e = document.createElement("div");
    e.innerHTML = html;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  return (
    <IonPage>
      <IonHeader></IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Current</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard>
          <h1>{currentSong.Title}</h1>
          <div dangerouslySetInnerHTML={{ __html: currentSong.Lyrics }}></div>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Current;
