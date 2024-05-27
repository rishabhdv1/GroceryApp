import React, { } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { IonCol, IonItem, IonList, IonPage, IonRow } from '@ionic/react';


const MyWallet: React.FC = () => {
  return (
    <IonPage>
      <Header showBackButton title="My Wallet" />
      <Common>
        <IonRow>
        <IonCol size="12" className="ion-text-center" style={{fontSize:"2em"}}>My Balance</IonCol>
        <IonCol size="12" className="ion-text-center">
          <span style={{color:"green",fontSize:"2em"}}>₹ {"200"}</span>
        </IonCol>
        <IonCol size="12" className="ion-text-center">
            <span>Use to pay 100% on any order</span>
        </IonCol>
      </IonRow>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default MyWallet;
