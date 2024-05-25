import { IonFooter, IonIcon,   IonImg,   IonTabBar, IonTabButton } from "@ionic/react";
import { cartOutline, compassOutline, gridOutline, homeOutline, personOutline } from "ionicons/icons";
import home from '../assets/svg/home.svg'
import cartImage from '../assets/svg/cart.svg'
import subscribe from '../assets/svg/subs.svg'
import profile from '../assets/svg/profile.svg'
const TabBar: React.FC = () => {
    return (
      <IonFooter>
        <IonTabBar color="success" slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonImg src={home} />
            {/* <IonIcon size="large" aria-hidden="true" icon={homeOutline} /> */}
          </IonTabButton>
          <IonTabButton tab="tab2" href="/categories">
            {/* <IonImg src={cartImage} /> */}
            <IonIcon size="large" aria-hidden="true" icon={gridOutline} />
          </IonTabButton>
          <IonTabButton tab="tab3" href="/cart">
            <IonImg src={cartImage} />
            {/* <IonIcon size="large" aria-hidden="true" icon={cartOutline} /> */}
          </IonTabButton>
          <IonTabButton tab="tab4" href="/subscription">
            <IonImg src={subscribe} />
          </IonTabButton>
          <IonTabButton tab="tab5" href="/account">
            <IonImg src={profile} />
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    )
}
export default TabBar;