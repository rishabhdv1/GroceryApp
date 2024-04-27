/* import { IonContent, IonPage, IonList, IonItem, IonLabel, IonAvatar, IonText, IonSelect, IonSelectOption, IonIcon, IonImg, IonBadge, IonRow, IonCol, IonButton } from '@ionic/react';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { } from 'ionicons/icons';
import image1 from "../assets/BackendImages/OfferOfTheWeek/CocoMosha.webp"
import image2 from "../assets/BackendImages/OfferOfTheWeek/CheddarCheese.webp"
import image3 from "../assets/BackendImages/OfferOfTheWeek/GOCheese.webp"
import { useParams } from 'react-router';

const OrderHistory: React.FC = () => {
  const { orderId } = useParams<{ OrderId: any }>();
  const [lang,setLang] = useState(localStorage.getItem('lang') || ('english'));
  const [userName,setUserName] = useState(localStorage.getItem('userName') || '');
  const [email,setEmail] = useState(localStorage.getItem('email') || '');

  const [orderHistory, setOrderHistory] = useState<any[]>([
    {id: 1, image: image1, date: "2/17/2024", status: "Arrives Tomorrow"},
    {id: 3, image: image2, date: "3/17/2024", status: "Delivered"},
    {id: 5, image: image3, date: "4/17/2024", status: "Delivered"},
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
        setUserName(localStorage.getItem('userName') || 'Default User');
      }
      if (data.email) {
        setEmail(data.email);
      } else {
        setEmail(localStorage.getItem('email') || 'default@example.com');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
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
                <IonRow className="ion-align-items-center" style={{width:"100%"}}>
                  <IonCol size="2">
                    <IonImg src={order.image} />
                  </IonCol>
                  <IonCol>
                    <IonLabel>
                      <p>Date: {order.date}</p>
                      <IonBadge color="success">{order.status}</IonBadge>
                    </IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonButton expand="block" fill="outline" size="small" routerLink={`/orderDetail/${order.id}`}>Details</IonButton>
                    <IonButton expand="block" fill="outline" size="small">Track</IonButton>
                  </IonCol>
                </IonRow>
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
 */

import React, { useEffect, useState } from 'react';
import { IonBadge, IonButton, IonCol, IonFooter, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';

interface BuyItem {
  id: number;
  attributes: {
    StockQty: number;
    name: string;
    price: number;
    quantity: number;
  };
  imageUrl: string; // Added imageUrl here
}

const OrderHistory: React.FC = () => {
  const [buyItems, setBuyItems] = useState<BuyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBuyItems = async () => {
      try {
        const existingBuyItems = JSON.parse(localStorage.getItem('buyItems') || '[]') as number[];
        const promises = existingBuyItems.map(async (orderId: number) => {
          const response = await axios.get(`${URL}/api/grocery-lists/${orderId}?populate=*`);
          const { id, attributes } = response.data.data;
          const imageUrl = attributes.productImage?.data[0]?.attributes.url || ''; // Safely handle potential null values
          
          console.log("Data >>>", response.data.data); // Logging each item for debugging
          return { id, attributes, imageUrl }; // Include imageUrl in the return object
        });
        const newBuyItems = await Promise.all(promises);
        setBuyItems(newBuyItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching buy items:', error);
      }
    };

    fetchBuyItems();
  }, []);

  // Function to remove an item from the cart
  const removeBuy = (itemId: number) => {
    const updatedBuyItems = buyItems.filter(item => item.id !== itemId);
    setBuyItems(updatedBuyItems);
    // Update localStorage after removing item
    const updatedorderIds = updatedBuyItems.map(item => item.id);
    localStorage.setItem('buyItems', JSON.stringify(updatedorderIds));
  };

  // Calculate total price of all items in the cart
  const totalAmount = buyItems.reduce((total, item) => total + (item.attributes.price * item.attributes.StockQty), 0).toFixed(2);

  return (
    <IonPage>
      <Header showMenu showNot title="MY ORDERS" />
      <Common>
        <IonList>
          {loading ? (
            <p>Loading...</p>
          ) : (
            buyItems.map(item => (
              <>
                {/* <IonItem key={item.id}>
                  <IonImg slot="start" style={{ width: "50px" }} src={`${URL}${item.imageUrl}`} />
                  <IonLabel>
                    <h2>{item.attributes.name}</h2>
                    <p>Price: ₹{item.attributes.price}</p>
                    <p>Quantity: {item.attributes.StockQty}</p>
                  </IonLabel>
                  <IonButton fill="clear" onClick={() => removeBuy(item.id)}>Remove</IonButton>
                </IonItem> */}

                <IonItem key={item.id}>
                <IonRow className="ion-align-items-center" style={{width:"100%"}}>
                  <IonCol size="2">
                    <IonImg src={`${URL}${item.imageUrl}`} />
                  </IonCol>
                  <IonCol>
                    <IonLabel>
                      <p>Date: {Date().slice(0, 15)}</p>
                      <IonBadge color="success">{'order.status'}</IonBadge>
                    </IonLabel>
                  </IonCol>
                  <IonCol size="3">
                    <IonButton expand="block" fill="outline" size="small" routerLink={`/orderDetail/${item.id}`}>Details</IonButton>
                    <IonButton expand="block" fill="outline" size="small" routerLink={`/track/${item.id}`}>Track</IonButton>
                  </IonCol>
                </IonRow>
              </IonItem>
              </>
            ))
          )}
        </IonList>
      </Common>
      <IonFooter>
        <div>
          {buyItems.length === 0 ? (
            <p className="ion-text-center">Your cart is empty</p>
          ) : (
            <>
              <IonItem>
                <span>Total Amount:</span>
                <span slot="end">₹{totalAmount}</span>
              </IonItem>
              <IonButton expand="block">
                <span style={{ fontSize: "1.6em" }}>Proceed to Checkout</span>
              </IonButton>
            </>
          )}
        </div>
      </IonFooter>
      <TabBar />
    </IonPage>
  );
};

export default OrderHistory;
