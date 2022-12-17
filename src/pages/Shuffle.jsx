import {
  IonButton,
  IonCard,
  IonCardSubtitle,
  IonContent,
  IonHeader,
  IonPage,
  useIonViewWillEnter,
} from "@ionic/react";

import { Share } from "@capacitor/share";
import "./Style.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import { useState } from "react";

const Shuffle = () => {
  useIonViewWillEnter(() => {
    fetchRandomSong();
  }, []);
  const [randomSong, setRandomSong] = useState("");
  async function handleShare() {
    let lyrics = randomSong.Lyrics.replace(/<\/?[^>]+(>|$)/g, "");
    await Share.share({
      title: randomSong.Title,
      text: lyrics,
      Author: randomSong.Author,
    });
  }

  async function fetchRandomSong() {
    const querySnapshot = await getDocs(collection(db, "Lyrics"));
    const tempArray = [];
    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data());
      tempArray[tempArray.length - 1].id = doc._document.key.path.segments[6];
    });

    setRandomSong(tempArray[Math.floor(Math.random() * tempArray.length)]);
    console.log("Hello");
  }

  let noSong = randomSong.Title === "No Song Selected" ? true : false;

  return (
    <IonPage>
      <IonContent fullscreen>
        <div onLoad={fetchRandomSong} className="page">
          <IonHeader collapse="condense"></IonHeader>
          <IonCard className="card">
            <h1 className="title">{randomSong.Title}</h1>
            <div dangerouslySetInnerHTML={{ __html: randomSong.Lyrics }}></div>
            <IonCardSubtitle>- {randomSong.Author}</IonCardSubtitle>
            <IonButton
              hidden={noSong}
              onClick={handleShare}
              style={{
                marginTop: "12px",
                maxWidth: "150px",
              }}
            >
              Share
            </IonButton>
            <IonButton
              hidden={noSong}
              onClick={fetchRandomSong}
              style={{
                marginTop: "12px",
                maxWidth: "150px",
              }}
            >
              New Song
            </IonButton>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Shuffle;
