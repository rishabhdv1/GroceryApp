import { IonContent, IonPage, IonList, IonItem, IonLabel, IonAvatar, IonText, IonSelect, IonSelectOption, IonIcon } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { logIn, logOut, logOutOutline } from 'ionicons/icons';

const OrderHistory: React.FC = () => {
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
      <Header showMenu showNot title="MY ORDERS" />
      <Common>
        <IonContent>
          <IonList lines="full">
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

export default OrderHistory;
