import { IonContent, IonPage, IonList, IonItem, IonLabel, IonAvatar, IonText, IonSelect, IonSelectOption } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';

const Account: React.FC = () => {
  const [userData, setUserData] = useState<any>({
    name: 'John Doe',
  });

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
    fetchOrderHistory();
  }, []);

  return (
    <IonPage>
      <Header showBackButton title="My Account" />
      <Common>
        <IonContent>
          <IonList lines="full">
            <IonItem>
              <IonAvatar slot="start">
                <img src="https://ionicframework.com/docs/img/demos/avatar.svg" alt="User Avatar" />
              </IonAvatar>
              <IonLabel>
                <h2>{userData.name}</h2>
                <p>{localStorage.getItem("email")}</p>
              </IonLabel>
            </IonItem>
            <IonItem button routerLink="/account/settings">
              <IonLabel>Settings</IonLabel>
            </IonItem>
            <IonItem>
              <IonSelect label="Language" defaultValue={"english"} interface="action-sheet">
                <IonSelectOption value={"hindi"}>Hindi</IonSelectOption>
                <IonSelectOption value={"english"}>English</IonSelectOption>
                <IonSelectOption value={"bengali"}>Bengali</IonSelectOption>
                <IonSelectOption value={"marathi"}>Marathi</IonSelectOption>
                <IonSelectOption value={"gujarati"}>Gujarati</IonSelectOption>
                <IonSelectOption value={"punjabi"}>Punjabi</IonSelectOption>
                <IonSelectOption value={"kannad"}>Kannad</IonSelectOption>
                <IonSelectOption value={"tamil"}>Tamil</IonSelectOption>
                <IonSelectOption value={"telugu"}>Telugu</IonSelectOption>
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
