import {
  IonButton,
  IonCard,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonSearchbar,
  useIonAlert,
  useIonViewWillEnter,
} from "@ionic/react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { search, trashBin } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase-config";
import "./Style.css";

function Search() {
  const [songs, setSongs] = useState([]);
  const historyUse = useHistory();
  const [filteredSongs, setFilteredSongs] = useState([]);
  const { setCurrentSong, setHistory, history, currentUser } = useAuth();
  const [presentAlert] = useIonAlert();

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

    history.forEach((el) => {
      if (el.Title === song.Title) {
        let index = history.indexOf(el);
        history.splice(index, 1);
      }
    });

    setHistory((history) => [song, ...history]);
    historyUse.replace("/current");
  };

  const handleSongEdit = (song) => {
    setCurrentSong(song);
    historyUse.replace("/edit");
  };

  const handleDelete = async (song) => {
    await presentAlert({
      header: "Are you sure you want to delete " + song.Title + "?",
      buttons: [
        {
          text: "No",
          role: "cancel",
          handler: () => {},
        },
        {
          text: "Yes",
          role: "confirm",
          handler: () => {
            deleteDoc(doc(db, "Lyrics", song.id));
            fetchSongs();
          },
        },
      ],
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonSearchbar
          searchIcon={search}
          placeholder="Search Songs"
          showClearButton="always"
          clearIcon={trashBin}
          id="searchBar"
          debounce={1000}
          onIonChange={(ev) => handleChange(ev)}
        ></IonSearchbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="page">
          <IonCard className="card">
            {filteredSongs.map((song) => (
              <IonItem className="list" key={songNumber++}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSongClick(song)}
                >
                  <h2>
                    {songNumber} - {song.Title}
                  </h2>
                </div>
                {currentUser && currentUser.uid === song.CreatedBy ? (
                  <>
                    <IonButton
                      style={{ margin: "0 10px" }}
                      onClick={() => handleSongEdit(song)}
                    >
                      Edit
                    </IonButton>
                    <IonButton onClick={() => handleDelete(song)}>
                      Delete
                    </IonButton>
                  </>
                ) : null}
              </IonItem>
            ))}
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default Search;
