import { IonButton, IonCol, IonInput, IonPage, IonRow } from '@ionic/react';
import React, { useState } from 'react';
import Header from '../components/Header';
import Common from '../components/Common';
import { URL } from '../helpers/url';

const Delete: React.FC = () => {
    const [addressTitle,setAddressTitle] = useState('');
    const [addressDescription,setAddressDescription] = useState('');
    const [payload,setPayload] = useState({
        "data": {
          "AddressTitle": "string",
          "AddressDescription": "string",
          "users_permissions_users": [
            "string or id",
            "string or id"
          ],
          "userid": "string"
        }
      });

      const sendData = (event:React.FormEvent) => {
        event.preventDefault();
        console.log("addressTitle >>>",addressTitle);
        console.log("addressDescription >>>",addressDescription);
        
        const userid = localStorage.getItem('id');
        const token = localStorage.getItem('jwt')
        const user = localStorage.getItem('userName');

        fetch(`${URL}/api/shipping-addresses?filters[userid][$eq]=${userid}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                "data": {
                    "AddressTitle": addressTitle,
                    "AddressDescription": addressDescription,
                    "users_permissions_users": [
                      user,
                      user
                    ],
                    "userid": userid
                  }
            }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setAddressTitle("");
            setAddressDescription("");
        })
        .catch(error => console.error('Fetch error', error))
      }
  return (
    <IonPage>
      <Header showBackButton showCart title="Delete" />
      <Common>
        <IonRow>
            <IonCol size="12">
                <IonInput value={addressTitle} onIonInput={(e:any) => setAddressTitle(e.detail.value)} fill="outline" placeholder="Title" />
            </IonCol>
            <IonCol size="12">
                <IonInput value={addressDescription} onIonInput={(e:any) => setAddressDescription(e.detail.value)} fill="outline" placeholder="Description" />
            </IonCol>
            <IonCol size="12">
                <IonButton expand="block" onClick={sendData}>
                    <span>SUBMIT</span>
                </IonButton>
            </IonCol>
        </IonRow>
      </Common>
    </IonPage>
  );
};

export default Delete;
