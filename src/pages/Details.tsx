import { IonAlert, IonBadge, IonButton, IonCol, IonFab, IonFabButton, IonFooter, IonIcon, IonImg, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useParams } from 'react-router';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { star, starOutline } from 'ionicons/icons';
import favAdd from '../assets/svg/heartfilled.svg'
import favrem from '../assets/svg/heartOutline.svg'

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
  const [isSubscribed,setIsSubscribed] = useState(false);
  const [isFavourite,setIsFavourite] = useState(false);
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
    window.location.href = "./cart"
  };

  const handleSubscribe = () => {
    setIsSubscribed(true);
  };
  const handleUnSubscribe = () => {
    setIsSubscribed(false);
  }

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
  const addFav = () => {
    setIsFavourite(false);
  }
  const removeFav = () => {
    setIsFavourite(true);
  }
  return (
    <IonPage>
      <Header showBackButton showCart title="Details" />
      <Common>
        <IonList lines="full">
          <IonFab style={{position:"sticky",right:"0px"}}>
            {isFavourite ? (
              <IonImg style={{height:"50px"}} onClick={addFav} src={favAdd} />
            ):(
              <IonImg style={{height:"50px"}} onClick={removeFav} src={favrem} />
            )}
          </IonFab>
          <IonItem lines="none">
            <IonImg style={{height:"400px"}} src={`${URL}${imageUrl}`} />
          </IonItem>
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
      <IonFooter style={{background:"#fff"}}>
        <IonRow>
          <IonCol size="6">
            {isSubscribed ? (
            <IonButton style={{fontSize: "1.2em"}} color="medium" expand="block" onClick={handleUnSubscribe}>
              Subscribed
            </IonButton>
            ):(
            <IonButton style={{fontSize: "1.2em"}} color="success" expand="block" onClick={handleSubscribe}>
              Subscribe
            </IonButton>
            )}
          </IonCol>
          <IonCol size="6">
            <IonButton style={{fontSize: "1.2em"}} color="success" fill="outline" expand="block" onClick={handleAddToCart}>
              Buy Once
            </IonButton>
          </IonCol>
        </IonRow>
      </IonFooter>
    </IonPage>
  );
};

export default Detail;