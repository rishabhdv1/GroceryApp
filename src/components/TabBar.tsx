import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import { cartOutline, ellipse, gridOutline, homeOutline, notificationsOutline, personOutline, refreshCircle, square, triangle } from "ionicons/icons";

const TabBar: React.FC = () => {
    return (
      <IonTabBar slot="bottom">
        <IonTabButton tab="tab1" href="/tab1">
          <IonIcon aria-hidden="true" icon={homeOutline} />
          <IonLabel>Home</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab2" href="/tab2">
          <IonIcon aria-hidden="true" icon={gridOutline} />
          <IonLabel>Categories</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab3" href="/tab3">
          <IonIcon aria-hidden="true" icon={cartOutline} />
          <IonLabel>Cart</IonLabel>
        </IonTabButton>
        <IonTabButton tab="tab5" href="/account">
          <IonIcon aria-hidden="true" icon={personOutline} />
          <IonLabel>My Account</IonLabel>
        </IonTabButton>
      </IonTabBar>
    )
}
export default TabBar;