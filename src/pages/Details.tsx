import { IonButton, IonCard, IonCol, IonContent, IonIcon, IonImg, IonInput, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
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
  const [customQuantity,setCustomQuantity] = useState();
  const [cartItems, setCartItems] = useState<any>({});
  const [imageUrl, setImageUrl] = useState<any>('');
  useEffect(() => {
    async function fetchCartData2() {
      try {
        const response = await axios.get(`${URL}/api/grocery-lists/${productId}?populate=*`);
        console.log("Fuirts and veg >>", response.data.data);
        console.log("Image >>", response.data.data.attributes.productImage.data[0].attributes.url);
        setCartItems(response.data.data.attributes);
        setImageUrl(response.data.data.attributes.productImage.data[0].attributes.url)
      } catch (error) {
        console.error('Error fetching data from Strapi:', error);
      }
    };
    fetchCartData2();
  }, []);

  
  return (
    <IonPage>
      <Header showBackButton title="Grocery" />
      <Common>
        <IonList>
          <IonItem key={cartItems.id}>
            <span>{cartItems.name}</span>
          </IonItem>
          <IonItem>
            <IonRow style={{ width: "100%", fontSize: "1.2em" }}>
              <IonCol size="6">MRP: <span style={{ textDecoration: "line-through" }}>₹{cartItems.price}</span></IonCol>
              <IonCol size="6">Price: ₹{cartItems.offerPrice}</IonCol>
            </IonRow>
          </IonItem> {/* {pathUrl+entry.attributes.productImage.data[0].attributes.url} */}
          <IonCard>
            <IonImg src={`${URL}${imageUrl}`} />
          </IonCard>
        </IonList>
        <IonList>
          <IonItem>
            <IonSelect fill="outline" label="Quantity" interface="action-sheet">
              <IonSelectOption value="1">1 Kg</IonSelectOption>
              <IonSelectOption value="2">2 Kg</IonSelectOption>
              <IonSelectOption value="3">2 X 1 Kg</IonSelectOption>
              <IonSelectOption value="custom">Custom</IonSelectOption>
            </IonSelect>
          </IonItem>
          {cartItems.quantity === 'custom' && (
            <IonItem>
              <IonInput
                type="number"
                placeholder="Enter quantity"
                value={customQuantity}
                onIonChange={(e) => setCustomQuantity(e.detail.value)}
              ></IonInput>
            </IonItem>
          )}
          <IonItem>
            <span>About the product</span><br />
          </IonItem>
          <IonItem>
            <span>{cartItems.aboutTheProduct}</span>
          </IonItem>
          {/* <IonItem>
            <span>Nutritional Facts</span>
            <IonIcon slot="end" icon={add} />
          </IonItem>
          <IonItem>
            <span>Other product Info</span>
            <IonIcon slot="end" icon={add} />
          </IonItem> */}
          <IonRow>
            <IonCol>
              <IonButton expand="block">Add to cart</IonButton>
            </IonCol>
          </IonRow>
        </IonList>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Detail;
