import { IonContent, IonPage, IonList, IonItem, IonLabel, IonAvatar, IonText } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';

const Account: React.FC = () => {
  // Mock user data (replace with actual user data fetched from your backend)
  const [userData, setUserData] = useState<any>({
    name: 'John Doe',
    email: 'johndoe@example.com',
    // Add more user information as needed
  });

  // Mock order history data (replace with actual order history fetched from your backend)
  const [orderHistory, setOrderHistory] = useState<any[]>([]);

  // Simulated function to fetch order history
  const fetchOrderHistory = async () => {
    try {
      // Here you would typically make a network request to fetch the user's order history
      // For demonstration purposes, let's assume you have a static data file or API
      const response = await fetch(`api/orders`);
      const data = await response.json();
      setOrderHistory(data);
    } catch (error) {
      console.error('Error fetching order history:', error);
    }
  };

  useEffect(() => {
    fetchOrderHistory();
  }, []);

  return (
    <IonPage>
      <Header title="My Account" />
      <Common>
        <IonContent>
          <IonList lines="full">
            <IonItem>
              <IonAvatar slot="start">
                <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="User Avatar" />
              </IonAvatar>
              <IonLabel>
                <h2>{userData.name}</h2>
                <p>{userData.email}</p>
              </IonLabel>
            </IonItem>
          </IonList>

          <IonList>
            <IonItem button routerLink="/account/settings">
              <IonLabel>Settings</IonLabel>
            </IonItem>
          </IonList>

          <IonList>
            <IonItem>
              <IonLabel>Order History</IonLabel>
            </IonItem>
            {orderHistory.map((order, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <IonText color="primary">Order ID: {order.id}</IonText>
                  <p>Date: {order.date}</p>
                  {/* Add more order details as needed */}
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
