import { IonAlert, IonBadge, IonButton, IonCard, IonCol, IonContent, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { add } from 'ionicons/icons';
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
}

const Detail: React.FC = () => {
  const { productId } = useParams<{ productId: any }>();
  const { orderId } = useParams<{ orderId: any }>();
  const [customQuantity,setCustomQuantity] = useState();
  const [cartItems, setCartItems] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<any>('');
  const [showAlert,setShowAlert] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');
  const [StockQty,setStockQty] = useState();
  useEffect(() => {
    async function fetchCartData2() {
      try {
        const response = await axios.get(`${URL}/api/grocery-lists/${productId}?populate=*`);
        console.log("Fuirts and veg >>", response.data.data);
        console.log("Image >>", response.data.data.attributes.productImage.data[0].attributes.url);
        setCartItems(response.data.data.attributes);
        setStockQty(response.data.data.attributes.StockQty)
        setImageUrl(response.data.data.attributes.productImage.data[0].attributes.url)
      } catch (error) {
        console.error('Error fetching data from Strapi:', error);
      }
    };
    fetchCartData2();
  }, []);

  const handleAddToCart = () => {
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    existingCartItems.push(productId);
    localStorage.setItem('cartItems', JSON.stringify(existingCartItems));
    window.location.reload();
  };
  const handleBuyGrocery = () => {
    setShowAlert(true);
    /* const existingBuyItems = JSON.parse(localStorage.getItem('buyItems') || '[]');
    existingBuyItems.push(productId);
    localStorage.setItem('buyItems', JSON.stringify(existingBuyItems));
    window.location.reload(); */
  };
  const handlePaymentOptionSelect = (option: string) => {
    setPaymentOption(option);
    setShowAlert(false);
    // You can handle the selected payment option here
  };
  
  return (
    <IonPage>
      <Header showMenu showNot title="Grocery" />
      <Common>
        <IonList lines="full">
          <IonItem key={cartItems.id}>
            <span style={{fontSize:"1.6em"}}>{cartItems.name}</span>
          </IonItem>
          <IonItem>
            <IonRow style={{ width: "100%", fontSize: "1.2em" }}>
              <IonCol size="6">MRP: <span style={{ textDecoration: "line-through" }}>₹{cartItems.price}</span></IonCol>
              <IonCol size="6">Offer Price: ₹{cartItems.offerPrice}</IonCol>
            </IonRow>
          </IonItem>
          <IonImg src={`${URL}${imageUrl}`} />
          <IonRow style={{width:"100%"}}>
            <IonCol size="12" className="ion-padding">
              <IonItem style={{border:"1px solid #ccc"}}>
                <span>Stock Quantity</span>
                <span slot="end">{StockQty}</span>
              </IonItem>
            </IonCol>
            <IonCol></IonCol>
          </IonRow>
          <IonItem>
            <IonInput
              fill="outline"
              type="number"
              label="Enter quantity :-"
              value={customQuantity}
              onIonChange={(e:any) => setCustomQuantity(e.detail.value)}
            ></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel>About the product</IonLabel>
          </IonItem>
          <IonItem>
            <span>{cartItems.aboutTheProduct}</span>
          </IonItem>
          <IonItem>
            <span>Dealer Name</span>
            <IonBadge slot="end" className="ion-padding" color="light">Dealer Name</IonBadge>
          </IonItem>
          <IonRow>
            <IonCol size="6">
              <IonButton style={{fontSize:"1.2em"}} color="secondary" expand="block" onClick={handleAddToCart}>
                <span>Add to cart</span>
              </IonButton>
            </IonCol>
            <IonCol size="6">
              <IonButton style={{fontSize:"1.2em"}} color="tertiary" expand="block" onClick={handleBuyGrocery}>
                <span>Buy Now</span>
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
