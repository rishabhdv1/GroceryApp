import { IonAlert, IonBadge, IonButton, IonCol, IonImg, IonInput, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import { useParams } from 'react-router';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';

interface CartItem {
    attributes: any;
    id: number;
    name: string;
    price: number;
    offerPrice: number;
    aboutTheProduct: string;
}

const Detail: React.FC = () => {
  const { productId } = useParams<{ productId: any }>();
  const [cartItems, setCartItems] = useState<CartItem | any>({});
  const [imageUrl, setImageUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');
  const [stockQty, setStockQty] = useState<number>(0);
  const [quantityOptions, setQuantityOptions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchCartData() {
      try {
        const response = await axios.get(`${URL}/api/grocery-lists/${productId}?populate=*`);
        const fetchedData = response.data.data.attributes;
        setCartItems(fetchedData);
        console.log(response.data.data.attributes.Availability);
        
        setImageUrl(fetchedData.productImage.data[0].attributes.url);
        setStockQty(fetchedData.StockQty);

        const optionsArray = fetchedData.QuantityOption.split('\n');
        setQuantityOptions(optionsArray);
      } catch (error) {
        console.error('Error fetching data from Strapi:', error);
      }
    };
    fetchCartData();
  }, [productId]);

  const handleAddToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    existingCartItems.push({ productId, quantity: cartItems.selectedQuantity });
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    alert('Added to cart');
  };

  const handleBuyGrocery = () => {
    setShowAlert(true);
  };

  const handlePaymentOptionSelect = (option: string) => {
    setPaymentOption(option);
    setShowAlert(false);
  };

  return (
    <IonPage>
      <Header showMenu showNot title="Grocery" />
      <Common>
        <IonList lines="full">
          <IonItem key={cartItems.id}>
            <span style={{fontSize: "1.6em"}}>{cartItems.name}</span>
            {cartItems.Availability ? (
              <></>
            ) : (
              <IonBadge slot="end" color="danger">Unavailable</IonBadge>
            )}
          </IonItem>
          <IonItem>
            <IonRow style={{ width: "100%", fontSize: "1.2em" }}>
              <IonCol size="6">MRP: <span style={{ textDecoration: "line-through" }}>₹{cartItems.price}</span></IonCol>
              <IonCol size="6">Offer Price: ₹{cartItems.offerPrice}</IonCol>
            </IonRow>
          </IonItem>
          <IonItem>
            <IonImg src={`${URL}${imageUrl}`} />
          </IonItem>
          <IonItem>
            <IonSelect interface="popover" fill="outline" label="Select Quantity" onIonChange={e => setCartItems({...cartItems, selectedQuantity: e.detail.value})}>
              {quantityOptions.map((option, index) => (
                <IonSelectOption key={index} value={option}>{option}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>
          <IonItem>
            <strong>About the product</strong>
          </IonItem>
          <IonItem>
            <span style={{whiteSpace: "pre-line"}}>{cartItems.aboutTheProduct}</span>
          </IonItem>
          <IonRow>
            <IonCol size="6">
              <IonButton style={{fontSize: "1.2em"}} color="secondary" expand="block" onClick={handleAddToCart}>
                Add to cart
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton style={{fontSize: "1.2em"}} color="tertiary" expand="block" onClick={handleBuyGrocery}>
                Buy Now
              </IonButton>
            </IonCol>
          </IonRow>
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
      <TabBar />
    </IonPage>
  );
};

export default Detail;