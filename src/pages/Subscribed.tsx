import React, { useEffect, useRef, useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCheckbox, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRadio, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { add, arrowBack, close, location, pencil, pricetag, remove, trash } from 'ionicons/icons';

interface CartItem {
  id: number;
  attributes: {
    StockQty: number;
    name: string;
    price: number;
    quantity: number;
  };
  imageUrl: string; // Added imageUrl here
}

const Subscription: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
        const promises = existingCartItems.map(async (cartItem: { productId: string, quantity: string }) => {
          const response = await axios.get(`${URL}/api/grocery-lists/${cartItem.productId}?populate=*`, {
            headers: {
              "ngrok-skip-browser-warning": true,
              'Accept': 'application/json'
            }
          });
          const { id, attributes } = response.data.data;
          const imageUrl = attributes.productImage?.data[0]?.attributes.url || '';          
          console.log("Data >>>", response.data.data);
          return { 
            id, 
            attributes: {
              ...attributes,
              quantity: cartItem.quantity
            }, 
            imageUrl 
          };
        });
        const newCartItems = await Promise.all(promises);
        setCartItems(newCartItems);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  
  useEffect(() => { /* Fetch Address */
    const fetchAddress = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const userid = localStorage.getItem('id');
        const response2 = await axios.get(`${URL}/api/shipping-addresses?filters[userid][$eq]=${userid}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            "ngrok-skip-browser-warning": true,
            'Accept': 'application/json'
          }
        });
        console.log("Address >>>", response2.data.data);
        // Set addresses in state
        // setAddresses(response2.data.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
  
    fetchAddress();
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (itemId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    // Update localStorage after removing item
    const updatedProductIds = updatedCartItems.map(item => item.id);
    localStorage.setItem('cartItems', JSON.stringify(updatedProductIds));
  };
  
  return (
    <IonPage>
      <Header title="Subscription" />
      <Common>
        <div style={{position:"sticky",top:"0",zIndex:"1",paddingLeft:"10px",background:"#fff"}}>
          <IonSelect style={{position:"sticky",top:"0"}} interface="popover" value="Tomorrow, 7 AM - 9PM">
            <IonSelectOption value="Tomorrow, 7 AM - 9PM">Tomorrow, 7 AM - 9PM</IonSelectOption>
            <IonSelectOption value="Yesterday, 7 AM - 9PM">Yesterday, 7 AM - 9PM</IonSelectOption>
            <IonSelectOption value="Today, 7 AM - 9PM">Today, 7 AM - 9PM</IonSelectOption>
            <IonSelectOption value="This Month">This Month</IonSelectOption>
            <IonSelectOption value="Last Month">Last Month</IonSelectOption>
          </IonSelect>
        </div>
        <IonList>
          {loading ? (
            <p>Loading...</p>
          ) : (
            cartItems.map(item => (
              <IonCard>
                <IonItem key={item.id} lines="full">
                  <IonRow className="ion-align-items-center" style={{width:"100%"}}>
                    <IonCol size="2">
                      <IonImg style={{ width: "50px" }} src={`${URL}${item.imageUrl}`} />
                    </IonCol>
                    <IonCol size="10" className="ion-no-padding">
                      <IonRow className="ion-align-items-center">
                        <IonCol size="11">
                          <IonLabel>
                            <h2>{item.attributes.name}</h2>
                          </IonLabel>
                        </IonCol>
                        <IonCol size="1">
                          <IonIcon style={{fontSize:"1.2em"}} icon={close} onClick={() => removeFromCart(item.id)} />
                        </IonCol>
                        <IonCol size="8">
                          <p className="ion-no-margin">{item.attributes.quantity} for ₹ {item.attributes.price}</p>
                        </IonCol>
                        <IonCol size="4">
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonItem>
              </IonCard>
            ))
          )}
        </IonList>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Subscription;
