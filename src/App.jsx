import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { shuffle, archive, list, musicalNotes } from "ionicons/icons";
import { Redirect, Route } from "react-router-dom";
import Current from "./pages/Current";
import Edit from "./pages/Edit";
import History from "./pages/History";
import Index from "./pages/Index";
import Random from "./pages/Shuffle";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */
import "./theme/variables.css";

import Login from "./components/Login";
import AuthProvider from "./contexts/AuthContext";
import Create from "./pages/Create";

setupIonicReact();

const App = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonToolbar
          color="light"
          style={{
            position: "fixed",
            bottom: "50px",
            background: "transparent",
          }}
        >
          <IonLabel>
            <Login />
          </IonLabel>
        </IonToolbar>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/index">
              <Index />
            </Route>
            <Route exact path="/current">
              <Current />
            </Route>
            <Route exact path="/">
              <Redirect to="/index" />
            </Route>
            <Route exact path="/history">
              <History />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/edit">
              <Edit />
            </Route>
            <Route exact path="/shuffle">
              <Random />
            </Route>
          </IonRouterOutlet>

          <IonTabBar slot="bottom">
            <IonTabButton tab="index" href="/index">
              <IonIcon icon={list} />
              <IonLabel>Index</IonLabel>
            </IonTabButton>
            <IonTabButton tab="current" href="/current">
              <IonIcon icon={musicalNotes} />
              <IonLabel>Current</IonLabel>
            </IonTabButton>
            <IonTabButton tab="history" href="/history">
              <IonIcon icon={archive} />
              <IonLabel>History</IonLabel>
            </IonTabButton>
            <IonTabButton tab="shuffle" href="/shuffle">
              <IonIcon icon={shuffle} />
              <IonLabel>Shuffle</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
