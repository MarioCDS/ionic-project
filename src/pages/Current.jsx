import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonLabel,
} from "@ionic/react";
import ExploreContainer from "../components/ExploreContainer";
import Login from "../components/Login";
import "./Current.css";

const Current = () => {
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
      <IonFooter>
        <IonToolbar>
          <IonLabel>
            <Login />
          </IonLabel>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Current;
