import React, { useEffect, useState } from 'react';
import { IonButton, IonFooter, IonImg, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';

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

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]') as number[];
        const promises = existingCartItems.map(async (productId: number) => {
          const response = await axios.get(`${URL}/api/grocery-lists/${productId}?populate=*`);
          const { id, attributes } = response.data.data;
          const imageUrl = attributes.productImage?.data[0]?.attributes.url || ''; // Safely handle potential null values
          
          console.log("Data >>>", response.data.data); // Logging each item for debugging
          return { id, attributes, imageUrl }; // Include imageUrl in the return object
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

  // Calculate total price of all items in the cart
  const totalAmount = cartItems.reduce((total, item) => total + (item.attributes.price * item.attributes.StockQty), 0).toFixed(2);

  return (
    <IonPage>
      <Header showMenu showNot title="Cart" />
      <Common>
        <IonList>
          {loading ? (
            <p>Loading...</p>
          ) : (
            cartItems.map(item => (
              <IonItem key={item.id}>
                <IonImg slot="start" style={{ width: "50px" }} src={`${URL}${item.imageUrl}`} />
                <IonLabel>
                  <h2>{item.attributes.name}</h2>
                  <p>Price: ₹{item.attributes.price}</p>
                  <p>Quantity: {item.attributes.StockQty}</p>
                </IonLabel>
                <IonButton fill="clear" onClick={() => removeFromCart(item.id)}>Remove</IonButton>
              </IonItem>
            ))
          )}
        </IonList>
      </Common>
      <IonFooter>
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
      </IonFooter>
      <TabBar />
    </IonPage>
  );
};

export default Cart;
