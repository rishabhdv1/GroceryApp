import { IonContent, IonPage, IonList, IonItem, IonLabel, IonAvatar, IonSelect, IonSelectOption, IonIcon, IonModal, IonButton, IonRadio, IonRow, IonCol, IonInput, IonCheckbox, IonFooter, IonToolbar, IonTitle, IonImg, IonHeader } from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import Common from '../components/Common';
import { add, checkbox, checkboxOutline, clipboard, clipboardOutline, close, globeOutline, gridOutline, headsetOutline, informationCircleOutline, location, locationOutline, logOut, logOutOutline, mailOutline, pencil, trash } from 'ionicons/icons';
import { URL } from '../helpers/url';
import axios from 'axios';
import TabBar from '../components/TabBar';

const Account: React.FC = () => {
  const [lang,setLang] = useState(localStorage.getItem('lang') || ('english'));
  const [userName,setUserName] = useState(localStorage.getItem('userName') || '');
  const [email,setEmail] = useState(localStorage.getItem('email') || '');
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(() => {
    return localStorage.getItem('selectedAddress') || undefined;
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showNicknameInput, setShowNicknameInput] = useState(Boolean);
  const modal = useRef<HTMLIonModalElement>(null);
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
  
  
  const fetchOrderHistory = async () => {
    try {
      const response = await fetch(`api/orders`);
      const data = await response.json();
      setOrderHistory(data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchOrderHistory();
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    localStorage.setItem('userName', userName);
    localStorage.setItem('email', email);
  }, [lang, userName, email]);

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem('selectedAddress', selectedAddress);
    }
  }, [selectedAddress]);
  
  useEffect(() => { /* Fetch Address */
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const userid = localStorage.getItem('id');
        const response2 = await axios.get(`${URL}/api/shipping-addresses?filters[userid][$eq]=${userid}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "ngrok-skip-browser-warning": true,
            'Accept': 'application/json',
          }
        });
        console.log("Address >>>", response2.data.data);
        // Set addresses in state
        setAddresses(response2.data.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchAddress();
  }, []);

 const fetchUserData = async () => {
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch('http://localhost:1337/api/users/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.username) {
        setUserName(data.username);
      } else {
        // Fall back to localStorage or set default
        setUserName(localStorage.getItem('userName') || 'Default User');
      }
      if (data.email) {
        setEmail(data.email);
      } else {
        // Fall back to localStorage or set default
        setEmail(localStorage.getItem('email') || 'default@example.com');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Fallback to localStorage in case of error
      setUserName(localStorage.getItem('userName') || 'Default User');
      setEmail(localStorage.getItem('email') || 'default@example.com');
    }
  };
  const handleLogOut = () => {
    localStorage.clear();
    window.location.href = "/login"
  }
  const toggleAddAddress = () => {
    setShowAddAddress(!showAddAddress)
  }
  const toggleShowNicknameInput = () => {
    setShowNicknameInput(!showNicknameInput);
  }
  const handleEditAddress = (address:any) => {
  }
  const handleDeleteAddress = (entryId:any) => {
    const token = localStorage.getItem('jwt');
    try {
      axios.delete(`${URL}/api/shipping-addresses/${entryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const updatedAddresses = addresses.filter(entry => entry.id !== entryId);
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error('Error deleting address',error);
    }
  }

  return (
    <IonPage>
      <Header title="My Account" />
      <Common>
        <IonContent>
          <IonList lines="full">
            <IonItem>
              <IonAvatar slot="start">
                <IonImg src="https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg" alt="User Avatar" />
              </IonAvatar>
              <IonLabel>
                <h2>{userName}</h2>
                <p>{email}</p>
              </IonLabel>
              {/* <IonIcon size="large" icon={logOutOutline} onClick={(e) => handleLogOut()} /> */}
            </IonItem>
            <IonItem>
              <IonIcon slot="start" src={globeOutline} />
              <IonSelect value={lang} onIonChange={(e) => setLang(e.detail.value)} label="Language" defaultValue="english" interface="action-sheet">
                <IonSelectOption value="hindi">Hindi</IonSelectOption>
                <IonSelectOption value="english">English</IonSelectOption>
                <IonSelectOption value="bengali">Bengali</IonSelectOption>
                <IonSelectOption value="marathi">Marathi</IonSelectOption>
                <IonSelectOption value="gujarati">Gujarati</IonSelectOption>
                <IonSelectOption value="punjabi">Punjabi</IonSelectOption>
                <IonSelectOption value="kannad">Kannad</IonSelectOption>
                <IonSelectOption value="tamil">Tamil</IonSelectOption>
                <IonSelectOption value="telugu">Telugu</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" src={clipboardOutline} />
              <span>My Orders</span>
            </IonItem>
            <IonItem onClick={() => setIsOpen(true)}>
              <IonIcon slot="start" src={locationOutline} />
              <span>My Addresses</span>
              <span slot="end">{selectedAddress}</span>
            </IonItem>
            <IonModal isOpen={isOpen}>
              <IonHeader>
                <IonToolbar style={{fontSize:"2em"}}>
                  <IonRow className="ion-text-center">
                    <IonCol size="2"></IonCol>
                    <IonCol>
                      <span>My Addresses</span>
                    </IonCol>
                    <IonCol size="2">
                      <IonIcon onClick={() => setIsOpen(false)} icon={close} />
                    </IonCol>
                  </IonRow>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <IonRow>
                  <IonCol size="12">
                    <IonItem style={{border:"1px solid",fontSize:"1.4em"}} onClick={() => modal.current?.setCurrentBreakpoint(0.75)}>
                      <IonIcon slot="start" src={location} />
                      <span>Choose Current Location</span>
                    </IonItem>
                  </IonCol>
                  <IonCol size="12">
                    <IonItem style={{border:"1px solid",fontSize:"1.4em"}} onClick={() => setIsOpen2(true)}>
                      <IonIcon slot="start" src={add} />
                      <span>Add New Address</span>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonModal isOpen={isOpen2}> {/* Add Addresses */}
                  <IonToolbar>
                    <IonTitle className="ion-text-center">
                      <strong>Add Address</strong>
                    </IonTitle>
                  </IonToolbar>
                  <IonContent className="ion-padding">
                    <IonRow>
                      <IonCol size="12">
                        <IonInput fill="outline" label="Address Title" value={addressTitle} onIonInput={(e:any) => setAddressTitle(e.detail.value)} labelPlacement="floating" />
                      </IonCol>
                      <IonCol size="12">
                        <IonInput fill="outline" label="Address Description" value={addressDescription} onIonInput={(e:any) => setAddressDescription(e.detail.value)} labelPlacement="floating" />
                      </IonCol>
                      {/* <IonCol size="12">
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
                      </IonCol> */}
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonButton fill="outline" expand="block" onClick={() => setShowNicknameInput(false)}>Home</IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton fill="outline" expand="block" onClick={() => setShowNicknameInput(false)}>Office</IonButton>
                      </IonCol>
                      <IonCol>
                        <IonButton fill="outline" expand="block" onClick={() => setShowNicknameInput(true)}>Other</IonButton>
                      </IonCol>
                      {showNicknameInput && 
                        <IonCol size="12">
                          <IonInput fill="outline" label="Nickname this address as" labelPlacement="floating" />
                        </IonCol>
                      }
                    </IonRow>
                  </IonContent>
                  <IonFooter className="ion-no-border">
                    <IonRow>
                      <IonCol size="12" className="ion-padding">
                        <IonCheckbox labelPlacement="end">Set this as my default delivery address</IonCheckbox>
                      </IonCol>
                      <IonCol size="6">
                        <IonButton expand="block" onClick={() => setIsOpen(false)}>
                          <span>Cancel</span>
                        </IonButton>
                      </IonCol>
                      <IonCol size="6">
                        <IonButton expand="block" onClick={sendData}>
                          <span>Save</span>
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonFooter>
                </IonModal>
                <IonList> {/* Fetched Addresses */}
                  {addresses.map((entry: any) => (
                    <IonItem key={entry.id}>
                      <IonRow style={{width:"100%"}}>
                        <IonCol size="2">
                          <IonRadio
                            onClick={() => setSelectedAddress(entry.attributes.addressTitle.toString())}
                            value={entry.id.toString()}
                            checked={selectedAddress === entry.id.toString()}
                            onIonSelect={() => setSelectedAddress(entry.id.toString())}
                          />
                        </IonCol>
                        <IonCol size="8">
                          <IonLabel onClick={() => setSelectedAddress(entry.id.toString())}>
                            <h2>{entry.attributes.AddressTitle}</h2>
                            <p>{entry.attributes.AddressDescription}</p>
                          </IonLabel>
                        </IonCol>
                        <IonCol size="2">
                          <IonButton fill="outline" onClick={() => handleEditAddress(entry.id)}>
                            <IonIcon src={pencil} />
                          </IonButton>
                          <IonButton fill="outline" onClick={() => handleDeleteAddress(entry.id)}>
                            <IonIcon src={trash} />
                          </IonButton>
                        </IonCol>
                      </IonRow>
                    </IonItem>
                  ))}
                </IonList>
              </IonContent>
            </IonModal>
            <IonItem routerLink="/categories">
              <IonIcon slot="start" src={gridOutline} />
              <span>Category</span>
            </IonItem>
            <IonItem routerLink="/faq">
              <IonIcon slot="start" src={mailOutline} />
              <span>FAQ</span>
            </IonItem>
            <IonItem routerLink="/contactus">
              <IonIcon slot="start" src={headsetOutline} />
              <span>Contact Us</span>
            </IonItem>
            <IonItem routerLink="/about">
              <IonIcon slot="start" src={informationCircleOutline} />
              <span>About</span>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" src={logOutOutline} />
              <span>Logout</span>
            </IonItem>
          </IonList>
        </IonContent>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Account;
