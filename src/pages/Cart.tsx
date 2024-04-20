import { IonButton, IonFooter, IonImg, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import './Tab3.css';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import image1 from "../assets/m4/casual_shoes.jpeg"
import image2 from "../assets/m4/casual_shoes2.jpeg"
import image3 from "../assets/m4/gloves.jpeg"
import image4 from "../assets/m4/mufflers.jpeg"
import image5 from "../assets/m4/shavers.jpeg"
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';

interface CartItem {
  attributes: any;
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Tab3: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const Entries = async () => {
        try {
            const response3 = await axios.get(`${URL}/api/carts`);
            console.log("Cart >>",response3.data.data);
            setCartItems(response3.data.data);
        } catch (error) {
          console.error('Error fetching data from Strapi:', error);
        }
    };
    Entries();
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
  };

  // Calculate total price of all items in the cart
  const totalAmount = cartItems.reduce((total, item) => total + (item.attributes.price * item.attributes.quantity), 0);

  return (
    <IonPage>
      <Header showMenu showNot title="Cart" />
      <Common>
        <IonList>
          {cartItems.map(item => (
            <IonItem key={item.id}>
              <IonImg slot="start" style={{width:"50px"}} src={getImageForItem(item.id)} />
              <IonLabel>
                <h2>{item.attributes.name}</h2>
                <p>Price: ₹{item.attributes.price}</p>
                <p>Quantity: {item.attributes.quantity}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => removeFromCart(item.id)}>Remove</IonButton>
            </IonItem>
          ))}
        </IonList>
      </Common>
      <IonFooter>
        <div>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <>
              <IonItem>
                <span>Total Amount:</span>
                <span slot="end">₹{totalAmount}</span>
              </IonItem>
              <IonButton expand="block">
                <span style={{fontSize:"1.6em"}}>Proceed to Checkout</span>
              </IonButton>
            </>
          )}
        </div>
      </IonFooter>
      <TabBar />
    </IonPage>
  );
};

export default Tab3;

// Function to get image for the item based on its id
function getImageForItem(itemId: number): string {
  switch (itemId) {
    case 1:
      return image1;
    case 2:
      return image2;
    case 3:
      return image3;
    case 4:
      return image4;
    case 5:
      return image5;
    default:
      return '';
  }
}
