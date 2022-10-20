import {
  IonCard,
  IonCardTitle,
  IonPage,
  IonItem,
  IonContent,
} from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";

import { useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router";
import "./Style.css";

export default function History() {
  let songNumber = 1;
  const { setCurrentSong, history } = useAuth();
  const historyUse = useHistory();
  useIonViewWillEnter(() => {
    console.log(history);
  }, [history]);

  //handle songClick
  const handleSongClick = (song) => {
    setCurrentSong(song);

    historyUse.replace("/current");
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="page">
          <IonCard className="card">
            <IonCardTitle className="cardTitle">Recently Viewed</IonCardTitle>
            {history.length > 0 ? null : (
              <h2>
                The history is currently empty, you can view lyrics in the
                index.
              </h2>
            )}
            {history.map((song) => (
              <IonItem className="list" key={songNumber++}>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleSongClick(song)}
                >
                  <h3>{song.Title}</h3>
                </div>
              </IonItem>
            ))}
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}
