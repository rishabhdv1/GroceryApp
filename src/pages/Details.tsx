import { IonContent,  IonPage } from '@ionic/react';
import {  } from 'react';

import Header from '../components/Header';
import { } from 'ionicons/icons';
import TabBar from '../components/TabBar';

const Detail: React.FC = () => {

  return (
    <IonPage>
      <Header title="Grocery" />
      <IonContent fullscreen>
        Details
      </IonContent>
      <TabBar />
    </IonPage>
  );
};

export default Detail;
