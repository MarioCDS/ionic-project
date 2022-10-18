import { Redirect, Route } from "react-router-dom";
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
import { musicalNotes, list } from "ionicons/icons";
import Current from "./pages/Current";
import Index from "./pages/Index";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import AuthProvider from "./contexts/AuthContext";
import Login from "./components/Login";
import Create from "./pages/Create";

setupIonicReact();

const App = () => (
  <IonApp>
    <AuthProvider>
      <IonReactRouter>
        <IonToolbar
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
              <Redirect to="/current" />
            </Route>
            <Route exact path="/create">
              <Create />
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
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
