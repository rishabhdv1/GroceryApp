import { IonContent, IonPage, IonList, IonItem, IonLabel, IonAvatar, IonText, IonSelect, IonSelectOption, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonImg, IonSearchbar, IonRadioGroup, IonRadio, IonRow, IonCol, IonInput, IonCheckbox, IonFooter } from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { add, headset, headsetOutline, information, informationCircleOutline, informationOutline, language, location, locationOutline, logIn, logOut, logOutOutline, mail, mailOutline, pencil, pin, trash } from 'ionicons/icons';

const ReferAndEarn: React.FC = () => {

  return (
    <IonPage>
      <Header showBackButton showNot title="REFER & EARN" />
      <Common>
        Refer & Earn
      </Common>
    </IonPage>
  );
};

export default ReferAndEarn;
