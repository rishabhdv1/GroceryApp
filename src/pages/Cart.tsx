import React, { useEffect, useState } from 'react';
import { IonAlert, IonButton, IonCol, IonFooter, IonIcon, IonImg, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { trashOutline } from 'ionicons/icons';

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

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert,setShowAlert] = useState(false);
  const [paymentOption,setPaymentOption] = useState();

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

  // Function to remove an item from the cart
  const removeFromCart = (itemId: number) => {
    const updatedCartItems = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCartItems);
    // Update localStorage after removing item
    const updatedProductIds = updatedCartItems.map(item => item.id);
    localStorage.setItem('cartItems', JSON.stringify(updatedProductIds));
  };
  const handleBuyNow = () => {
    setShowAlert(true);
  }
  const handlePaymentOptionSelect = (option: any) => {
    setPaymentOption(option);
    setShowAlert(false);
  };

  // Calculate total price of all items in the cart
  const totalAmount = cartItems.reduce((total, item) => total + (item.attributes.price * item.attributes.StockQty), 0).toFixed(2);

  return (
    <IonPage>
      <Header showMenu title="Cart" />
      <Common>
        <IonList>
          {loading ? (
            <p>Loading...</p>
          ) : (
            cartItems.map(item => (
              <IonItemSliding>
                <IonItem key={item.id} lines="full">
                  <IonRow className="ion-align-items-center" style={{width:"100%"}}>
                    <IonCol size="2">
                      <IonImg style={{ width: "50px" }} src={`${URL}${item.imageUrl}`} />
                    </IonCol>
                    <IonCol size="7">
                      <IonLabel>
                        <h2>{item.attributes.name}</h2>
                        <p>₹{item.attributes.price} for {item.attributes.quantity}</p>
                      </IonLabel>
                    </IonCol>
                    <IonCol size="3">
                      <IonButton expand="block" fill="outline" size="small" onClick={handleBuyNow}>Buy Now</IonButton>
                    </IonCol>
                  </IonRow>
                </IonItem>
                <IonItemOptions>
                  <IonItemOption color="danger">
                    <IonIcon onClick={() => removeFromCart(item.id)} size="large" icon={trashOutline} />
                  </IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))
          )}
        </IonList>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={'Select Payment Option'}
          buttons={[
            {
              text: 'Cash on Delivery',
              handler: () => {
                handlePaymentOptionSelect('Cash on Delivery');
              }
            },
            {
              text: 'Online',
              handler: () => {
                handlePaymentOptionSelect('Credit Card');
              }
            },
          ]}
        />
      </Common>
      {/* <IonFooter>
        <div>
          {cartItems.length === 0 ? (
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
      </IonFooter> */}
    </IonPage>
  );
};

export default Cart;
