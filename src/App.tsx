import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {  IonApp, IonIcon, IonLabel,  IonRouterOutlet, IonMenu, IonHeader, IonToolbar,  IonTitle, IonContent,  IonList,  IonItem,  IonMenuToggle,  setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cashOutline, chatbubbleOutline, gridOutline, logIn, peopleOutline, personOutline, square, walletOutline } from 'ionicons/icons';

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
import Delete from './pages/OrderDetails';
import SignUp from './pages/SignUp';
import CategoryDetailsPage from './pages/CategoryDetailsPage';
import Cart from './pages/Cart';
import Categories from './pages/Categories';
import Home from './pages/Home';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import TrackOrder from './pages/TrackOrder';
import ForgetPassword from './pages/ForgetPassword';

setupIonicReact();

const App: React.FC = () => {

  return(
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
                <IonItem routerLink="/account">
                  <IonIcon slot="start" icon={personOutline} />
                  <IonLabel>Profile</IonLabel>
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
                  <IonLabel>Grocery List</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem>
                  <IonIcon slot="start" icon={logIn} />
                  <IonLabel>All Brands</IonLabel>
                </IonItem>
              </IonMenuToggle>
              <IonMenuToggle>
                <IonItem routerLink="/categories">
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
                <IonItem routerLink="/categoryDetailspage/Deals%20of%20the%20week">
                  <IonIcon slot="start" icon={walletOutline} />
                  <IonLabel>Todays Deal</IonLabel>
                </IonItem>
              </IonMenuToggle>
            </IonList>
          </IonContent>
        </IonMenu>
  
  
        <IonRouterOutlet id="main">
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/detail/:productId">
            <Detail />
          </Route>
          <Route exact path="/categories">
            <Categories />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/orderhistory">
            <OrderHistory />
          </Route>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/notification">
            <Notification />
          </Route>
          <Route exact path="/account">
            <Account />
          </Route>
          <Route exact path="/categoryDetailspage/:categoryNameFilter">
            <CategoryDetailsPage />
          </Route>
          <Route exact path="/orderdetail/:orderId">
            <OrderDetails />
          </Route>
          <Route exact path="/track/:orderId">
            <TrackOrder />
          </Route>
          <Route exact path="/forget-password">
            <ForgetPassword />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
