import { IonContent, IonPage, IonList, IonItem, IonLabel, IonAvatar, IonText, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';

const Account: React.FC = () => {
  const [lang,setLang] = useState(localStorage.getItem('lang') || ('english'));
  const [userName,setUserName] = useState(localStorage.getItem('userName') || '');
  const [email,setEmail] = useState(localStorage.getItem('email') || '');

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

  return (
    <IonPage>
      <Header showMenu showNot title="My Account" />
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
            </IonItem>
            <IonItem button routerLink="/account/settings">
              <IonLabel>Settings</IonLabel>
            </IonItem>
            <IonItem>
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
              <IonLabel>Order History</IonLabel>
            </IonItem>
            {orderHistory.map((order, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <IonText color="primary">Order ID: {order.id}</IonText>
                  <p>Date: {order.date}</p>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Account;
