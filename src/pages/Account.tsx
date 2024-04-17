import { IonCard, IonCol, IonContent, IonImg, IonPage, IonRow } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';

const Account: React.FC = () => {
  return (
    <IonPage>
      <Header title="My Account" />
      <IonContent>
        Account
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default Account;
