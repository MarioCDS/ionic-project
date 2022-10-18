import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonFooter,
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
import { ellipse, square, triangle } from "ionicons/icons";
import Current from "./pages/Current";
import Search from "./pages/Search";
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
            <Route exact path="/current">
              <Current />
            </Route>
            <Route exact path="/search">
              <Search />
            </Route>
            <Route path="/index">
              <Index />
            </Route>
            <Route exact path="/">
              <Redirect to="/current" />
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
          </IonRouterOutlet>

          <IonTabBar style={{ marginTop: "60px" }} slot="bottom">
            <IonTabButton tab="current" href="/current">
              <IonIcon icon={triangle} />
              <IonLabel>Current</IonLabel>
            </IonTabButton>
            <IonTabButton tab="search" href="/search">
              <IonIcon icon={ellipse} />
              <IonLabel>Search</IonLabel>
            </IonTabButton>
            <IonTabButton tab="index" href="/index">
              <IonIcon icon={square} />
              <IonLabel>Index</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </AuthProvider>
  </IonApp>
);

export default App;
