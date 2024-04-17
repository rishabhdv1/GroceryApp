import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {  IonApp, IonIcon, IonLabel,  IonRouterOutlet,  IonTabBar,  IonTabButton, IonTabs, IonMenu, IonHeader, IonToolbar,  IonTitle, IonContent,  IonList,  IonItem,  IonMenuToggle,  setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cartOutline, cashOutline, chatbubbleOutline, gridOutline, homeOutline, logIn, notificationsOutline, peopleOutline, personOutline, square, walletOutline } from 'ionicons/icons';
import Tab1 from './pages/Home';
import Tab2 from './pages/Categories';
import Tab3 from './pages/Cart';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from './pages/Login';
import Notification from './pages/Notification';
import Account from './pages/Account';
import Detail from './pages/Details';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonMenu contentId="main" type="overlay">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonMenuToggle>
              <IonItem>
                <IonIcon slot="start" icon={homeOutline} />
                <IonLabel>Home</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem>
                <IonIcon slot="start" icon={chatbubbleOutline} />
                <IonLabel>Flash Sale</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem>
                <IonIcon slot="start" icon={square} />
                <IonLabel>Blogs</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem>
                <IonIcon slot="start" icon={logIn} />
                <IonLabel>All Brands</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem>
                <IonIcon slot="start" icon={gridOutline} />
                <IonLabel>All Categories</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem>
                <IonIcon slot="start" icon={peopleOutline} />
                <IonLabel>All Sellers</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem>
                <IonIcon slot="start" icon={cashOutline} />
                <IonLabel>Coupons</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem>
                <IonIcon slot="start" icon={walletOutline} />
                <IonLabel>Todays Deal</IonLabel>
              </IonItem>
            </IonMenuToggle>
            <IonMenuToggle>
              <IonItem routerLink="/login">
                <IonIcon slot="start" icon={walletOutline} />
                <IonLabel>Login</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </IonContent>
      </IonMenu>


      <IonRouterOutlet id="main">
        <Route exact path="/tab1">
          <Tab1 />
        </Route>
        <Route exact path="/detail/:product">
          <Detail />
        </Route>
        <Route exact path="/tab2">
          <Tab2 />
        </Route>
        <Route path="/tab3">
          <Tab3 />
        </Route>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/notification">
          <Notification />
        </Route>
        <Route exact path="/account">
          <Account />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
