import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import "./Index.css";
import {db} from "../firebase-config";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // console.log(db)
  })
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
