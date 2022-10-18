import { IonPage } from "@ionic/react";
import { useAuth } from "../contexts/AuthContext";

import { useIonViewWillEnter } from "@ionic/react";

export default function History() {
    const {history} = useAuth();
    useIonViewWillEnter(() => {
        console.log(history)
    }, [])

  return (
    <IonPage>History</IonPage>
  )
}
