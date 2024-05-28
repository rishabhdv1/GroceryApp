import { IonButton, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonInput, IonPage, IonRadio, IonRadioGroup, IonRow, IonToolbar } from '@ionic/react';
import React, { useState } from 'react'
import Header from '../components/Header';
import Common from '../components/Common';
import { close } from 'ionicons/icons';

const AddNewAddress: React.FC = () => {
    const [showNicknameInput,setShowNicknameInput] = useState(Boolean);
    const [addresses, setAddresses] = useState<any[]>([]);
  const [addressTitle,setAddressTitle] = useState("");
  const [addressDescription,setAddressDescription] = useState("");
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

    /* if (!token) {
      console.error('JWT token not found in localStorage');
      // Handle the absence of token (e.g., redirect to login page)
      return;
    } */
  
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
    .catch(error => console.error('Fetch error', error));
  }
  
    return (
        <IonPage>
            <Header showBackButton title="Add New Address" />
            <Common>
                <IonRow>
                    <IonCol size="12">
                        <IonInput fill="outline" label="Address Title" value={addressTitle} onIonInput={(e:any) => setAddressTitle(e.detail.value)} labelPlacement="floating" />
                      </IonCol>
                      <IonCol size="12">
                        <IonInput fill="outline" label="Address Description" value={addressDescription} onIonInput={(e:any) => setAddressDescription(e.detail.value)} labelPlacement="floating" />
                      </IonCol>
                    <IonCol size="12">
                        <IonInput fill="outline" label="House No" labelPlacement="floating" />
                    </IonCol>
                    <IonCol size="12">
                        <IonInput fill="outline" label="City Details" labelPlacement="floating" />
                    </IonCol>
                    <IonCol size="12">
                        <IonInput fill="outline" label="Pincode" labelPlacement="floating" />
                    </IonCol>
                    <IonCol size="12">
                        <IonInput fill="outline" label="Area Details" labelPlacement="floating" />
                    </IonCol>
                </IonRow>
                <IonRadioGroup>
                    <IonRow>
                        <IonCol size="3">
                            <IonRadio labelPlacement="end" onClick={() => setShowNicknameInput(false)}>Home</IonRadio>
                        </IonCol>
                        <IonCol size="5">
                            <IonRadio labelPlacement="end" onClick={() => setShowNicknameInput(false)}>Work/Office</IonRadio>
                        </IonCol>
                        <IonCol size="3">
                            <IonRadio labelPlacement="end" onClick={() => setShowNicknameInput(true)}>Other</IonRadio>
                        </IonCol>
                        {showNicknameInput && 
                            <IonCol size="12">
                                <IonInput fill="outline" label="Nickname this address as" labelPlacement="floating" />
                            </IonCol>
                        }
                    </IonRow>
                </IonRadioGroup>
            </Common>
            <IonFooter className="ion-no-border">
                <IonButton color="success" expand="block" onClick={sendData}>
                    <span style={{fontSize:"2em"}}>Save</span>
                </IonButton>
            </IonFooter>
        </IonPage>
    )
}
export default AddNewAddress;