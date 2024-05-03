import React, { useEffect, useState } from 'react';
import { IonPage } from '@ionic/react';
import Header from '../components/Header';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { Step, Stepper } from 'react-form-stepper';
import GoogleMapReact from 'google-map-react';
import { text } from 'ionicons/icons';

interface buyItem {
  id: number;
  attributes: {
    StockQty: number;
    name: string;
    price: number;
    quantity: number;
  };
  imageUrl: string;
}

const TrackOrder: React.FC = () => {
  const [buyItems, setBuyItems] = useState<buyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [latitude,setLatitude] = useState<number | null>(null);
  const [Longitude,setLongitude] = useState<number | null>(null);

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

  navigator.geolocation.getCurrentPosition(
    (position) =>  {
      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)
    },
    (error) => {
      console.error("Error",error);
      
    }
  )

  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const defaultProps = {
    center: {
      lat: 24.456997303060692,
      lng: 74.87094578017731
    },
    zoom: 15
  };
  return (
    <IonPage>
      <Header showBackButton title="TRACK ORDER" />
      <Common>
        {/* <Stepper activeStep={1}>
          <Step label="Ordered 15:30, September 9, 2024" />
          <Step label="Shipped 15:45, September 9, 2024" />
          <Step label="Delivered Estimated delivery by by 17:30 / 17:30. September 9,2024" />
        </Stepper> */}
        <div style={{ height: '100%', width: '100%' }}>
          <GoogleMapReact bootstrapURLKeys={{ key: "" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom} >
            <AnyReactComponent lat={latitude} lng={Longitude} text="My Marker" />
          </GoogleMapReact>
        </div>
      </Common>
    </IonPage>
  );
};

export default TrackOrder;
