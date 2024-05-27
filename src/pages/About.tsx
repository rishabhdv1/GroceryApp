import React, { } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { IonPage } from '@ionic/react';


const About: React.FC = () => {
  return (
    <IonPage>
      <Header title="About" />
      <Common>
        About
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default About;
