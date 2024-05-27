import React, { } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { IonPage } from '@ionic/react';


const Favourite: React.FC = () => {
  return (
    <IonPage>
      <Header title="Favourite" />
      <Common>
        Favourite
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Favourite;
