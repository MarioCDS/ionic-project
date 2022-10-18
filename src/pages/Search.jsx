import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  useIonViewWillEnter,
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
  const history = useHistory();
  const [filteredSongs, setFilteredSongs] = useState([]);
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
        {filteredSongs.map((song) => (
          <div style={{ cursor: "pointer" }} key={song.Number}>
            <h1>{song.Title}</h1>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
}

export default Search;
