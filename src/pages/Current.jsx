import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useAuth } from "../contexts/AuthContext";
import { Share } from "@capacitor/share";
import "./Style.css";

const Current = () => {
  async function handleShare() {
    let lyrics = currentSong.Lyrics.replace(/<\/?[^>]+(>|$)/g, "");
    await Share.share({
      title: currentSong.Title,
      text: lyrics,
      Author: currentSong.Author,
    });
  }
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
        <IonButton style={{ marginLeft: "47%" }} onClick={handleShare}>
          Share
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Current;
