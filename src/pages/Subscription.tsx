import React, { useEffect, useState } from 'react';
import { IonCard, IonCheckbox, IonCol, IonFooter, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { close } from 'ionicons/icons';
import subFrame from '../assets/svg/frame.svg'

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
  const [selectedDays, setSelectedDays] = useState<{[key:number]:string[]}>({});

  const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  const handleChange = (day: string, itemId: number) => {
    const newSelectedDays = { ...selectedDays };
    if (!newSelectedDays[itemId]) {
      newSelectedDays[itemId] = [];
    }

    if (newSelectedDays[itemId].includes(day)) {
      newSelectedDays[itemId] = newSelectedDays[itemId].filter(selectedDay => selectedDay !== day);
    } else {
      newSelectedDays[itemId].push(day);
    }
    setSelectedDays(newSelectedDays);
  };

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
      <Header title="My Subscription" />
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
                <IonItem>
                  <IonImg slot="start" style={{ width: "50px" }} src={`${URL}${item.imageUrl}`} />
                  <IonRow>
                    <IonCol size="12">
                      <span>{item.attributes.name}</span>
                    </IonCol>
                    <IonCol size="12">
                      <IonRow>
                        <IonCol size="9">
                          <span>{item.attributes.quantity} for ₹ {item.attributes.price}</span>
                        </IonCol>
                        <IonCol size="3">
                          <span>Qty:{"2"}</span>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                  <IonIcon slot="end" size="large" icon={close} onClick={() => removeFromCart(item.id)} />
                </IonItem>
                <IonItem color="success">
                  {days.map((day, index) => (
                    <IonCheckbox
                      key={day}
                      value={day}
                      checked={selectedDays[item.id]?.includes(day) || false}
                      onIonChange={() => handleChange(day, item.id)}
                      style={{ marginRight: index === days.length - 1 ? 0 : '5px' }} // Adjust spacing for last checkbox
                    >
                      {/* Display day letter directly within the checkbox for a more compact layout */}
                      {dayLabels[index]}
                    </IonCheckbox>
                  ))}
                </IonItem>
              </IonCard>
            ))
          )}
        </IonList>
      </Common>
      <IonFooter className="ion-no-border">
        <IonRow style={{justifyContent:"center"}}>
          <IonCol size="8">
            <IonImg src={subFrame} />
          </IonCol>
        </IonRow>
      </IonFooter>
      <TabBar />
    </IonPage>
  );
};

export default Subscription;
