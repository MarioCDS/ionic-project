import {
  IonContent,
  IonHeader,
  IonPage,
  IonCard,
  IonSearchbar,
  useIonViewWillEnter,
  IonItem,
  IonButton,
} from "@ionic/react";
import "./Style.css";
import { search, trashBin } from "ionicons/icons";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Search() {
  const [songs, setSongs] = useState([]);
  const historyUse = useHistory();
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { setCurrentSong, setHistory, history, currentUser } = useAuth();
  let songNumber = 1;

  useIonViewWillEnter(() => {
    fetchSongs();
  }, []);

  async function fetchSongs() {
    const querySnapshot = await getDocs(collection(db, "Lyrics"));
    const tempArray = [];

    querySnapshot.forEach((doc) => {
      tempArray.push(doc.data());
      tempArray[tempArray.length - 1].id = doc._document.key.path.segments[6];
    });
    setSongs(tempArray);
    setFilteredSongs(tempArray);
  }

  const handleChange = (ev) => {
    let query = "";
    const target = ev.target;
    if (target) {
      query = target.value.toLowerCase();
      console.log(query);
    }

    setFilteredSongs(
      songs.filter((song) => song.Title.toLowerCase().indexOf(query) > -1)
    );
  };

  //handle songClick
  const handleSongClick = (song) => {
    setCurrentSong(song);
    setHistory((history) => [song.Title, ...history]);
    historyUse.replace("/current");
  };

  const handleSongEdit = (song) => {
    setCurrentSong(song);
    historyUse.replace("/edit");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonSearchbar
          searchIcon={search}
          placeholder="Search Songs"
          showClearButton="always"
          clearIcon={trashBin}
          debounce={1000}
          onIonChange={(ev) => handleChange(ev)}
        ></IonSearchbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonCard className="card">
          {filteredSongs.map((song) => (
            <IonItem className="list" key={songNumber++}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleSongClick(song)}
              >
                <h1>
                  {songNumber} - {song.Title}
                </h1>
              </div>
              {currentUser ? (
                <IonButton onClick={() => handleSongEdit(song)}>Edit</IonButton>
              ) : null}
            </IonItem>
          ))}
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

export default Search;
