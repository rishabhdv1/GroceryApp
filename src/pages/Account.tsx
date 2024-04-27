import { IonContent, IonPage, IonList, IonItem, IonLabel, IonAvatar, IonText, IonSelect, IonSelectOption, IonIcon, IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonImg, IonSearchbar, IonRadioGroup, IonRadio, IonRow, IonCol, IonInput, IonCheckbox, IonFooter } from '@ionic/react';
import React, { useState, useEffect, useRef } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { add, headset, headsetOutline, information, informationCircleOutline, informationOutline, language, location, locationOutline, logIn, logOut, logOutOutline, mail, mailOutline, pencil, pin, trash } from 'ionicons/icons';

const Account: React.FC = () => {
  const [lang,setLang] = useState(localStorage.getItem('lang') || ('english'));
  const [userName,setUserName] = useState(localStorage.getItem('userName') || '');
  const [email,setEmail] = useState(localStorage.getItem('email') || '');

  const [isOpen, setIsOpen] = useState(false);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showNicknameInput, setShowNicknameInput] = useState(Boolean);

  const [orderHistory, setOrderHistory] = useState<any[]>([
    {id: 122764, date: "2/17/2024"},
    {id: 255342, date: "3/17/2024"},
    {id: 388764, date: "4/17/2024"},
  ]);

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
    localStorage.setItem('lang',lang);
  })

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

  const modal = useRef<HTMLIonModalElement>(null);

  const addresses = [
    {id: 1, label: "Home", address: "136 Teachers Colony Neemuch, M.P. 458441"},
    {id: 2, label: "Office", address: "Dollor Infotech, Behind Sawanwala Petrol Pump, Neemuch, M.P. 458441"},
  ]

  const toggleAddAddress = () => {
    setShowAddAddress(!showAddAddress)
  }
  const toggleShowNicknameInput = () => {
    setShowNicknameInput(!showNicknameInput);
  }

  return (
    <IonPage>
      <Header showBackButton showNot title="My Account" />
      <Common>
        <IonContent>
          <IonList lines="full">
            <IonItem>
              <IonAvatar slot="start">
                <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="User Avatar" />
              </IonAvatar>
              <IonLabel>
                <h2>{userName}</h2>
                <p>{email}</p>
              </IonLabel>
              <IonIcon size="large" icon={logOutOutline} onClick={(e) => handleLogOut()} />
            </IonItem>
            <IonItem>
              <IonIcon slot="start" src={language} />
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
            <IonItem id="open-modal">
              <IonIcon slot="start" src={locationOutline} />
              <span>My Addresses</span>
              <span slot="end">{"Home"}</span>
            </IonItem>
            <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
              <IonContent className="ion-padding">
                <IonRow>
                  <IonCol size="12">
                    <IonItem style={{border:"1px solid",fontSize:"1.4em"}} onClick={() => modal.current?.setCurrentBreakpoint(0.75)}>
                      <IonIcon slot="start" src={location} />
                      <span>Choose Current Location</span>
                    </IonItem>
                  </IonCol>
                  <IonCol size="12">
                    <IonItem style={{border:"1px solid",fontSize:"1.4em"}} onClick={() => setIsOpen(true)}>
                      <IonIcon slot="start" src={add} />
                      <span>Add New Address</span>
                    </IonItem>
                  </IonCol>
                </IonRow>
                <IonModal isOpen={isOpen}>
                  <IonContent className="ion-padding">
                    <IonRow>
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
                    {/* Additional buttons and inputs */}
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
                        <IonButton expand="block">
                          <span>Save</span>
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonFooter>
                </IonModal>
                <IonList>
                  <IonRadioGroup value={'selectedAddress'} onIonChange={(e) => setSelectedAddress(e.detail.value)}>
                    {addresses.map((address, index) => (
                      <IonItem key={index}>
                        <IonRow>
                          <IonCol size="2">
                            <IonRadio value={address.label} />
                          </IonCol>
                          <IonCol size="8">
                            <IonLabel>
                              <h2>{address.label}</h2>
                              <p>{address.address}</p>
                            </IonLabel>
                          </IonCol>
                          <IonCol size="2">
                            <IonButton fill="outline" onClick={() => handleEditAddress(address)}>
                              <IonIcon src={pencil} />
                            </IonButton>
                            <IonButton fill="outline" onClick={() => handleDeleteAddress(address)}>
                              <IonIcon src={trash} />
                            </IonButton>
                          </IonCol>
                        </IonRow>
                      </IonItem>
                    ))}
                  </IonRadioGroup>
                </IonList>
              </IonContent>
            </IonModal>
            <IonItem>
              <IonIcon slot="start" src={mailOutline} />
              <span>FAQ</span>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" src={headsetOutline} />
              <span>Contact Us</span>
            </IonItem>
            <IonItem>
              <IonIcon slot="start" src={informationCircleOutline} />
              <span>About</span>
            </IonItem>
          </IonList>
        </IonContent>
      </Common>
    </IonPage>
  );
};

export default Account;
