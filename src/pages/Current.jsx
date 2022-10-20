import {
  IonButton,
  IonCard, IonCardSubtitle, IonContent,
  IonHeader,
  IonPage
} from "@ionic/react";

import { Share } from "@capacitor/share";
import { useAuth } from "../contexts/AuthContext";
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
          </IonHeader>
          <IonCard className="card">
            <h1 className="title">{currentSong.Title}</h1>
            <div dangerouslySetInnerHTML={{ __html: currentSong.Lyrics }}></div>
            <IonCardSubtitle>- {currentSong.Author}</IonCardSubtitle>
          </IonCard>
            <IonButton hidden={noSong} onClick={handleShare} style={{
              width: "80px"
            }}>Share</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Current;
