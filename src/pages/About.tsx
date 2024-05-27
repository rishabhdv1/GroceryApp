import React, { } from 'react';
import Header from '../components/Header';
import Common from '../components/Common';
import { IonCol, IonIcon, IonImg, IonItem, IonList, IonPage, IonRow } from '@ionic/react';
import subs from '../assets/svg/image.svg'
import fruits from '../assets/svg/about(Fruits).svg'
import { chevronForward } from 'ionicons/icons';
import TabBar from '../components/TabBar';

const About: React.FC = () => {
  return (
    <IonPage>
      <Header showBackButton title="About" />
      <Common>
        <IonRow>
          <IonCol size="12">
            <IonImg src={subs} />
          </IonCol>
          <IonCol size="12">
            <IonItem lines="none">
              What began little, with a solitary idea of a store that provides rebate and the basic thought of moving more for less, has become in the course of the last 10 years into the biggest retailer in this whole country.
            </IonItem><br/>
            <IonItem lines="none">
              Every week, about 265 million clients and individuals visit our in excess of 13,200 stores under 55 standards in 27 nations and eCommerce sites in 4 nations. With financial year 2018 income of $500.3 billion, ‘Organization Name’ utilizes over 2.2 million partners around the world.
            </IonItem><br/>
            <IonItem lines="none">
              SG Grocery keeps on being an innovator in support ability, corporate magnanimity and work opportunity. It’s everything part of our relentless promise to making openings and conveying an incentive to clients and networks the world over.         
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonImg src={fruits} />
          </IonCol>
        </IonRow>
        <IonList>
          <IonItem routerLink="/privacy-policy">
            <span>Privacy Policy</span>
            <IonIcon slot="end" icon={chevronForward} />
          </IonItem>
          <IonItem routerLink="/terms-of-services">
            <span>Terms and Services</span>
            <IonIcon slot="end" icon={chevronForward} />
          </IonItem>
        </IonList>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default About;
