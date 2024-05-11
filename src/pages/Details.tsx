import { IonAlert, IonBadge, IonButton, IonCol, IonIcon, IonImg, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { star, starOutline } from 'ionicons/icons';

interface CartItem {
    attributes: any;
    id: number;
    name: string;
    price: number;
    offerPrice: number;
    aboutTheProduct: string;
}

const Detail: React.FC = (onChange:any) => {
  const { productId } = useParams<{ productId: any }>();
  const [cartItems, setCartItems] = useState<CartItem | any>({});
  const [imageUrl, setImageUrl] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');
  const [stockQty, setStockQty] = useState<number>(0);
  const [quantityOptions, setQuantityOptions] = useState<string[]>([]);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    async function fetchCartData() {
      try {
        const response = await axios.get(`${URL}/api/grocery-lists/${productId}?populate=*`, {
          headers: {
            "ngrok-skip-browser-warning": true,
            'Accept': 'application/json'
          }
        });
        const fetchedData = response.data.data.attributes;
        setCartItems(fetchedData);
        console.log(response.data.data.attributes.Availability);
        
        setImageUrl(fetchedData.productImage.data[0].attributes.url);
        setStockQty(fetchedData.StockQty);

        const optionsArray = fetchedData.QuantityOption ? fetchedData.QuantityOption.split('\n') : ["1"];
        setQuantityOptions(optionsArray);

        if(optionsArray.length > 0) {
          setCartItems((prevItem: any) => ({...prevItem, selectedQuantity: optionsArray[0]}));
        }
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
    // alert('Added to cart');
  };

  const handleBuyGrocery = () => {
    setShowAlert(true);
  };

  const handlePaymentOptionSelect = (option: string) => {
    setPaymentOption(option);
    setShowAlert(false);
  };

  const handleStarClick = (value:any)=>{
    setRating(value);
    onChange(value);
  }
  const renderStars =()=>{
    let stars = [];
    for (let i=1; i<=5; i++){
      stars.push(
        <>
          <span> </span>
          <IonIcon key={i} icon={i <= rating ? star : starOutline}
          onClick={() =>
          handleStarClick(i)}
              style={{color:i <= rating ? "gold":"gray"}}
          />
        </>
      );
    }
    return stars;
  }
  return (
    <IonPage>
      <Header showMenu showCart title="Grocery" />
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
          <IonItem lines="none">
            <IonImg style={{height:"400px"}} src={`${URL}${imageUrl}`} />
          </IonItem>
          {quantityOptions.length > 1 && (
            <IonRow>
              <IonCol>
                <IonSelect value={cartItems.selectedQuantity} interface="popover" fill="outline" label="Select Quantity" onIonChange={e => setCartItems({...cartItems, selectedQuantity: e.detail.value})}>
                  {quantityOptions.map((option, index) => (
                    <IonSelectOption key={index} value={option}>{option}</IonSelectOption>
                  ))}
                </IonSelect>
              </IonCol>
            </IonRow>
          )}
          <IonItem lines="none">
            <strong>About the product</strong>
          </IonItem>
          <IonItem>
            <span style={{whiteSpace: "pre-line"}}>{cartItems.aboutTheProduct}</span>
          </IonItem>
          {cartItems.Ingredients ? (
            <>
              <IonItem lines="none">
                <strong>Ingredients</strong>
              </IonItem>
              <IonItem>
                <span style={{whiteSpace: "pre-line"}}>{cartItems.Ingredients}</span>
              </IonItem>
            </>
          ) : (
            <></>
          )}
          {/* <IonItem>
            Rate This Product
          </IonItem>
          <IonItem>
            <div style={{fontSize:"3em"}}>{renderStars()}</div>
          </IonItem> */}
          <IonRow>
            <IonCol size="6">
              <IonButton style={{fontSize: "1.2em"}} color="secondary" expand="block" onClick={handleAddToCart}>
                Add to cart
              </IonButton>
            </IonCol>
            <IonCol size="6">
              {cartItems.Availability ?(
                <IonButton style={{fontSize: "1.2em"}} color="tertiary" expand="block" onClick={handleBuyGrocery}>
                  Buy Now
                </IonButton>
              ):(
                <IonButton disabled style={{fontSize: "1.2em"}} color="tertiary" expand="block">
                  Buy Now
                </IonButton>
              )}
            </IonCol>
          </IonRow>
        </IonList>
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} header={'Select Payment Option'}
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
    </IonPage>
  );
};

export default Detail;