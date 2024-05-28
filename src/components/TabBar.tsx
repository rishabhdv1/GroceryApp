import { IonFooter, IonIcon,   IonImg,   IonTabBar, IonTabButton } from "@ionic/react";
import { cartOutline, compassOutline, gridOutline, homeOutline, personOutline } from "ionicons/icons";
import home from '../assets/svg/home.svg'
import cartImage from '../assets/svg/cart.svg'
import cartVector from '../assets/svg/Vector.svg'
import subscribe from '../assets/svg/subs.svg'
import profile from '../assets/svg/profile.svg'
import categoryIcon from '../assets/svg/category.png'
import heart from '../assets/svg/heart.svg'
const TabBar: React.FC = () => {
    return (
      <IonFooter>
        <IonTabBar color="success" slot="bottom">
          <IonTabButton tab="tab1" href="/home">
            <IonImg src={home} />
          </IonTabButton>
          <IonTabButton tab="tab2" href="/subscription">
            <IonImg src={subscribe} />
          </IonTabButton>
          <IonTabButton tab="tab3" href="/cart">
            <IonImg style={{position:"relative"}} src={cartImage} />
            <IonImg style={{position:"absolute",top:"28px"}} src={cartVector} />
          </IonTabButton>
          <IonTabButton tab="tab4" href="/favourite">
            <IonImg style={{height:"25px"}} src={heart} />
          </IonTabButton>
          <IonTabButton tab="tab5" href="/account">
            <IonImg src={profile} />
          </IonTabButton>
        </IonTabBar>
      </IonFooter>
    )
}
export default TabBar;