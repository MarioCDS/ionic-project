import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Current.css";
import db from "../firebase-config";
import { useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

const Current = () => {
  const [songs, setSongs] = useState([]);

  useIonViewWillEnter(() => {
    fetchSongs();
  }, []);

  async function fetchSongs() {
    const querySnapshot = await getDocs(collection(db, "Lyrics"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Current</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Current</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Current" />
      </IonContent>
    </IonPage>
  );
};

export default Current;
