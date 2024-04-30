import { IonPage } from '@ionic/react';
import React, { } from 'react';
import Header from '../components/Header';
import Common from '../components/Common';
import { } from 'ionicons/icons';

const ReferAndEarn: React.FC = () => {

  return (
    <IonPage>
      <Header showBackButton showCart title="REFER & EARN" />
      <Common>
        Refer & Earn
      </Common>
    </IonPage>
  );
};

export default ReferAndEarn;
