import { IonCard, IonCardTitle, IonPage, IonItem } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";

import { useIonViewWillEnter } from "@ionic/react";
import { useHistory } from "react-router";

export default function History() {
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
      <IonCard>
        <IonCardTitle>History</IonCardTitle>
        {history.map((song) => (
          <IonItem className="list">
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleSongClick(song)}
            >
              <h1>{song.Title}</h1>
            </div>
          </IonItem>
        ))}
      </IonCard>
    </IonPage>
  );
}
