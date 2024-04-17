import { IonButton, IonContent, IonFooter, IonImg, IonItem, IonLabel, IonList, IonPage } from '@ionic/react';
import './Tab3.css';
import { useState } from 'react';
import Header from '../components/Header';
import image1 from "../assets/m4/casual_shoes.jpeg"
import image2 from "../assets/m4/casual_shoes2.jpeg"
import image3 from "../assets/m4/gloves.jpeg"
import image4 from "../assets/m4/mufflers.jpeg"
import image5 from "../assets/m4/shavers.jpeg"
import TabBar from '../components/TabBar';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const Tab3: React.FC = () => {
  // Initialize cartItems with hardcoded items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { id: 1, name: "Casual Shoes", price: 50, quantity: 1 },
    { id: 2, name: "Gloves", price: 15, quantity: 2 }
    // Add more items as needed
  ]);

  // Function to remove an item from the cart
  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(cartItem => cartItem.id !== itemId));
  };

  // Calculate total price of all items in the cart
  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <IonPage>
      <Header title="Cart" />
      <IonContent fullscreen>
        <IonList>
          {cartItems.map(item => (
            <IonItem key={item.id}>
              <IonImg slot="start" style={{width:"50px"}} src={getImageForItem(item.id)} />
              <IonLabel>
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.quantity}</p>
              </IonLabel>
              <IonButton fill="clear" onClick={() => removeFromCart(item.id)}>Remove</IonButton>
            </IonItem>
          ))}
        </IonList>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <p>Total Amount: ${totalAmount}</p>
            <IonButton expand="block">Proceed to Checkout</IonButton>
          </>
        )}
      </IonContent>
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
