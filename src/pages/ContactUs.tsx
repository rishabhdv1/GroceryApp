import React, { useState } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { IonCard, IonCardContent, IonCardHeader, IonCol, IonIcon, IonInput, IonItem, IonPage, IonRow, IonTextarea } from '@ionic/react';
import { flagOutline } from 'ionicons/icons';

import PhoneInput from 'ion-intl-tel-input';


const ContactUs: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event: { target: { value: any; }; }) => {
    const formattedNumber = formatPhoneNumber(event.target.value); // Implement formatting logic
    setPhoneNumber(formattedNumber);

    // Use a library like react-hook-form for advanced validation
    setIsValid(validatePhoneNumber(formattedNumber)); // Implement validation logic

    if (onValidChange) {
      onValidChange(isValid);
    }
  };

  return (
    <IonPage>
      <Header title="Contact Us" />
      <Common>
        <IonCard className="ion-text-center">
          <IonCardHeader>
            <strong>Get in Touch!</strong>
          </IonCardHeader>
          <IonCardContent>One of our workspace experts will reach out to you based on your communicatoin preferences.</IonCardContent>
        </IonCard>
        <IonRow>
          <IonCol size="12"></IonCol>
          <IonCol size="12"></IonCol>
          <IonCol size="12"></IonCol>
          <IonCol size="12"></IonCol>
          <IonCol size="12">
            <IonItem>
              <span style={{fontSize:"1.2em",fontWeight:"bold"}}>Your Details </span>
            </IonItem>
            <IonItem>
              <IonInput fill="solid" placeholder="First Name" />
            </IonItem>
            <IonItem>
              <IonInput fill="solid" placeholder="Last Name" />
            </IonItem>
            <IonItem>
              <IonInput fill="solid" placeholder="Email" />
            </IonItem>
            <IonItem>
              <IonInput fill="solid" placeholder="Phone Number" />
            </IonItem>
            <IonItem>
              <IonTextarea fill="solid" rows={8} placeholder="Write your Question/Query here" />
            </IonItem>
          </IonCol>
          <IonCol size="12"></IonCol>
        </IonRow>
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

