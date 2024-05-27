import React, { useState } from 'react';
import Header from '../components/Header';
import Common from '../components/Common';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon, IonInput, IonItem, IonList, IonPage, IonRow, IonTextarea } from '@ionic/react';
import { call, location, mail } from 'ionicons/icons';
import TabBar from '../components/TabBar';


const ContactUs: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  return (
    <IonPage>
      <Header showBackButton title="Contact Us" />
      <Common>
        <IonCard className="ion-text-center">
          <IonCardHeader>
            <strong>Get in Touch!</strong>
          </IonCardHeader>
          <IonCardContent>One of our workspace experts will reach out to you based on your communicatoin preferences.</IonCardContent>
        </IonCard>
        <IonRow>
          <IonCol size="12">
            <IonItem lines="none">
              <span style={{fontSize:"1.2em",fontWeight:"bold"}}>Your Details </span>
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonInput fill="solid" placeholder="First Name" />
          </IonCol>
          <IonCol size="12">
            <IonInput fill="solid" placeholder="Last Name" />
          </IonCol>
          <IonCol size="12">
            <IonInput fill="solid" placeholder="Email" />
          </IonCol>
          <IonCol size="12">
            <IonInput fill="solid" placeholder="Phone Number" />
          </IonCol>
          <IonCol size="12">
            <IonTextarea fill="solid" rows={8} placeholder="Write your Question/Query here" />
          </IonCol>
          <IonCol size="12" className="ion-text-center">
            <IonButton color="success">
              <span>Send Message</span>
            </IonButton>
          </IonCol>
        </IonRow>
        <IonList>
          <IonItem>
            <IonIcon slot="start" icon={location} />
            <span>2464 Royal Ln,Mesa, New Jersey 45463</span>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={call} />
            <span>+1 (773) 600-4875, +1 (773) 600-4866</span>
          </IonItem>
          <IonItem>
            <IonIcon slot="start" icon={mail} />
            <span>sggrocery@gmail.com</span>
          </IonItem>
        </IonList>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default ContactUs;
function validatePhoneNumber(formattedNumber: any): React.SetStateAction<boolean> {
  throw new Error('Function not implemented.');
}

function onValidChange(isValid: boolean) {
  throw new Error('Function not implemented.');
}

