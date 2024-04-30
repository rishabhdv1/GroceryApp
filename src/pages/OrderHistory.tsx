import React, { useEffect, useState } from 'react';
import { IonBadge, IonButton, IonCol, IonFooter, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { trashOutline } from 'ionicons/icons';

interface BuyItem {
  id: number;
  attributes: {
    StockQty: number;
    name: string;
    price: number;
    quantity: number;
  };
  imageUrl: string;
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
          const imageUrl = attributes.productImage?.data[0]?.attributes.url || '';
          
          console.log("Data >>>", response.data.data);
          return { id, attributes, imageUrl };
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

  const removeBuy = (itemId: number) => {
    const updatedBuyItems = buyItems.filter(item => item.id !== itemId);
    setBuyItems(updatedBuyItems);
    
    const updatedorderIds = updatedBuyItems.map(item => item.id);
    localStorage.setItem('buyItems', JSON.stringify(updatedorderIds));
  };

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

                <IonItemSliding>
                  <IonItem key={item.id} lines="full">
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
                  <IonItemOptions>
                    <IonItemOption color="danger">
                      <IonIcon onClick={() => removeBuy(item.id)} size="large" icon={trashOutline} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
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
