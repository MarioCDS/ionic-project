import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonList,
  IonCardSubtitle,
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

  let noSong = currentSong.Title === "No Song Selected" ? true : false;

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="page">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">Current</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonCard className="card">
            <h1 className="title">{currentSong.Title}</h1>
            <div dangerouslySetInnerHTML={{ __html: currentSong.Lyrics }}></div>
            <IonCardSubtitle>- {currentSong.Author}</IonCardSubtitle>
          </IonCard>
          <IonList hidden={noSong} className="button-center">
            <IonButton onClick={handleShare}>Share</IonButton>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Current;
