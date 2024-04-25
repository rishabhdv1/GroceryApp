import React, { useEffect, useState } from 'react';
import { IonButton, IonCol, IonFooter, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { Step, Stepper } from 'react-form-stepper';

interface buyItem {
  id: number;
  attributes: {
    StockQty: number;
    name: string;
    price: number;
    quantity: number;
  };
  imageUrl: string; // Added imageUrl here
}

const TrackOrder: React.FC = () => {
  const [buyItems, setBuyItems] = useState<buyItem[]>([]);
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
        console.error('Error fetching cart items:', error);
      }
    };

    fetchBuyItems();
  }, []);

  // Function to remove an item from the cart
  const removeFromCart = (itemId: number) => {
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
      <Header showBackButton showNot title="TRACK ORDER" />
      <Common>
        <Stepper activeStep={1}>
          <Step label="Place Order" />
          <Step label="Payment Option" />
          <Step label="Delivered" />
        </Stepper>
      </Common>
    </IonPage>
  );
};

export default TrackOrder;
