import React, { useEffect, useState } from 'react';
import { IonBadge, IonButton, IonCol, IonFooter, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import Header from '../components/Header';
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
  const [buyItems, setBuyItems] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [productName,setProductName] = useState();
  const [price,setPrice] = useState();
  const [quantity,setQuantity] = useState();

  useEffect(() => {
    const fetchBuyItems = async () => {
      try {
        const response = await axios.get(`${URL}/api/orders?populate=*`, {
          headers: {
            "ngrok-skip-browser-warning": true,
            'Accept': 'application/json'
          }
        });
        console.log("Order Data >>>",response.data.data);
        setProductName(response.data.data[0].attributes.ProductName);
        setPrice(response.data.data[0].attributes.Price);
        setQuantity(response.data.data[0].attributes.Quantity);
        
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
      <Header showBackButton title="MY ORDERS" />
      <Common>
        <IonList>
          {buyItems.map((entry:any)=> (
             <IonItem key={entry.id}>
              {/* <IonImg slot="start" style={{ width: "50px" }} src={`${URL}${entry.imageUrl}`} /> */}
              <IonLabel>
                <h2>{entry.attributes.name}</h2>
                <p>Price: ₹{entry.attributes.price}</p>
                <p>Quantity: {entry.attributes.StockQty}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => removeBuy(entry.id)}>Remove</IonButton>
            </IonItem>
          ))}
          {loading ? (
            <p>Loading...</p>
          ) : (
              <>

                {/* <IonItemSliding>
                  <IonItem lines="full">
                    <IonRow className="ion-align-items-center" style={{width:"100%"}}>
                      <IonCol size="2">
                        <IonImg src="" />
                      </IonCol>
                      <IonCol size="7">
                        <IonLabel>
                          <h2>{productName}</h2>
                          <IonRow>
                            <IonCol>
                              <p>Price: ₹{price} {quantity}</p>
                            </IonCol>
                            <IonCol>
                              <IonBadge color="success">{'order.status'}</IonBadge>
                            </IonCol>
                          </IonRow>
                        </IonLabel>
                      </IonCol>
                      <IonCol size="3">
                        <IonButton expand="block" fill="outline" size="small">Details</IonButton>
                        <IonButton expand="block" fill="outline" size="small">Track</IonButton>
                      </IonCol>
                    </IonRow>
                  </IonItem>
                  <IonItemOptions>
                    <IonItemOption color="danger">
                      <IonIcon size="large" icon={trashOutline} />
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding> */}
              </>
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
    </IonPage>
  );
};

export default OrderHistory;
