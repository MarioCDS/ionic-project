import { IonCard, IonCardTitle, IonPage, IonTitle } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";

import { useIonViewWillEnter } from "@ionic/react";

export default function History() {
  const { history } = useAuth();
  useIonViewWillEnter(() => {
    console.log(history);
  }, [history]);

  return (
    <IonPage>
      <IonCard>
        <IonCardTitle>History</IonCardTitle>
        {history.map((song) => (
          <IonTitle key={song}>{song}</IonTitle>
        ))}
      </IonCard>
    </IonPage>
  );
}
