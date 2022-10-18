import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router";

import { db } from "../firebase-config";
import "./Current.css";
import "./Style.css";
import { useAuth } from "../contexts/AuthContext";

const Index = () => {
  const [songs, setSongs] = useState([]);
  const history = useHistory();
  const { setCurrentSong } = useAuth();

  useIonViewWillEnter(() => {
    fetchSongs();
  }, []);

  async function fetchSongs() {
    const querySnapshot = await getDocs(collection(db, "Lyrics"));
    const tempArray = [];

    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data());
    });
    setSongs(tempArray);
  }

  //handle songClick
  const handleSongClick = (song) => {
    setCurrentSong(song);
    history.replace("/current");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Index</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Index</IonTitle>
          </IonToolbar>
        </IonHeader>
        {songs.map((song) => (
          <div
            style={{ cursor: "pointer" }}
            onClick={() => handleSongClick(song)}
            key={song.Number}
          >
            <h1>{song.Title}</h1>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

export default Index;
