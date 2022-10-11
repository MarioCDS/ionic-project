import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import ExploreContainer from "../components/ExploreContainer";
import { db } from "../firebase-config";
import "./Index.css";

const Index = () => {
  useEffect(() => {
    console.log(db);
  });
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
        <ExploreContainer name="Index page" />
      </IonContent>
    </IonPage>
  );
};

export default Index;
