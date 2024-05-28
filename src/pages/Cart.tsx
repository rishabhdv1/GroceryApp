import React, { useEffect, useRef, useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCheckbox, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRadio, IonRadioGroup, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { add, arrowBack, close, location, pencil, pricetag, remove, trash } from 'ionicons/icons';
import coupon from '../assets/svg/Coupons.svg'

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

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAlert,setShowAlert] = useState(false);
  const [isOpen,setIsOpen] = useState(false);
  const [isOpen2,setIsOpen2] = useState(false);
  const [showNicknameInput,setShowNicknameInput] = useState(Boolean);
  const modal = useRef<HTMLIonModalElement>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(() => {
    return localStorage.getItem('selectedAddress') || undefined;
  });
  const [paymentOption,setPaymentOption] = useState();
  const [addresses2,setAddresses] = useState<any[]>([]);
  const [addressTitle,setAddressTitle] = useState();
  const [addressDescription,setAddressDescription] = useState();
  const [selectedValue, setSelectedValue] = useState<string>('');

  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  const addresses = [
    {id: 1, label: "Home", address: "136 Teachers Colony Neemuch, M.P. 458441"},
    {id: 2, label: "Office", address: "Dollor Infotech, Behind Sawanwala Petrol Pump, Neemuch, M.P. 458441"},
  ]

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

  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem('selectedAddress', selectedAddress);
    }
  }, [selectedAddress]);
  
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
        setAddresses(response2.data.data);
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
  const handleBuyNow = () => {
    setShowAlert(true);
  }
  const handlePaymentOptionSelect = (event: CustomEvent) => {
    setPaymentOption(event.detail.value);
  };
  const renderCashOnDeliveryContent = () => (
    <div>
      <IonButton style={{position:"fixed",bottom:"0",width:"90%"}} color="success">
        <span style={{fontSize:"2em"}}>Continue</span>
      </IonButton>
    </div>
  );
  const renderUpiContent = () => (
    <div>
      <p>Instructions for UPI payment</p>
      <IonButton style={{position:"fixed",bottom:"0",width:"90%"}} color="success" expand="block">
        <span style={{fontSize:"2em"}}>Pay ₹{totalAmount}</span>
      </IonButton>
    </div>
  );
  const renderWalletContent = () => (
    <div>
      <IonRow>
        <IonCol size="12" className="ion-text-center">My Balance</IonCol>
        <IonCol size="12" className="ion-text-center">
          <span style={{color:"green",fontSize:"1.4em"}}>₹ {"200"}</span>
        </IonCol>
      </IonRow>
      <IonButton style={{position:"fixed",bottom:"0",width:"90%"}} color="success" expand="block">
        <span style={{fontSize:"2em"}}>Pay ₹{totalAmount}</span>
      </IonButton>
    </div>
  );
  const renderCardContent = () => (
    <div>
      <IonItem>
        <IonIcon slot="start" icon={add} />
        <span>Add New Card</span>
      </IonItem>
      <IonButton style={{position:"fixed",bottom:"0",width:"90%"}} color="success" expand="block">
        <span style={{fontSize:"2em"}}>Pay ₹{totalAmount}</span>
      </IonButton>
    </div>
  );
  const renderPaymentContent = () => {
    switch (selectedValue) {
      case "cashOnDelivery":
        return renderCashOnDeliveryContent();
      case "upi":
        return renderUpiContent();
      case "wallet":
        return renderWalletContent();
      case "card":
        return renderCardContent();
      default:
        return null;
    }
  };
  const handleQtyInc = (itemId: number) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          attributes: {
            ...item.attributes,
            quantity: parseInt(item.attributes.quantity) + 1
          }
        };
      }
      return item;
    });
    setCartItems(newCartItems);
  };
  
  const handleQtyDec = (itemId: number) => {
    const newCartItems = cartItems.map(item => {
      if (item.id === itemId && item.attributes.quantity > 1) {  // Preventing quantity from going below 1
        return {
          ...item,
          attributes: {
            ...item.attributes,
            quantity: parseInt(item.attributes.quantity) - 1
          }
        };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  const handleEditAddress = (address:any) => {
  }
  const handleDeleteAddress = (entryId:any) => {
    const token = localStorage.getItem('jwt');
    try {
      axios.delete(`${URL}/api/shipping-addresses/${entryId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });
      const updatedAddresses = addresses.filter(entry => entry.id !== entryId);
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error('Error deleting address',error);
    }
  }
  
  const handleCheckout = async () => {
    setIsOpen(true);
    /* const checkoutData = {
      items: cartItems.map(item => ({
        product: item.id,
        quantity: item.attributes.quantity,
        price: item.attributes.price
      })),
      totalAmount: parseFloat(totalAmount),
      address: selectedAddress,
      paymentOption: paymentOption
    };
  
    try {
      const response = await axios.post(`${URL}/api/orders?populate=*`, checkoutData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`, // Assuming you store JWT in localStorage
        }
      });
      console.log('Order successful:', response.data);
      // Optionally, clear the cart here or navigate the user to a confirmation page
    } catch (error) {
      console.error('Error placing order:', error);
    } */
  };
  

  const totalAmount = cartItems.reduce((total, item) => total + (item.attributes.price * item.attributes.quantity), 0).toFixed(2);

  return (
    <IonPage>
      <Header title="Cart" />
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
                <IonItem key={item.id} lines="full">
                  <IonImg slot="start" style={{ width: "50px" }} src={`${URL}${item.imageUrl}`} />
                  <IonRow>
                    <IonCol size="12">
                      <span>{item.attributes.name}</span>
                    </IonCol>
                    <IonCol size="12">
                      <span>{item.attributes.quantity} for ₹ {item.attributes.price}</span>
                    </IonCol>
                  </IonRow>
                  <IonIcon slot="end" size="large" icon={close} onClick={() => removeFromCart(item.id)} />
                </IonItem>
                <IonItem color="success">
                  <IonRow className="ion-text-center" style={{width:"100%"}}>
                    <IonCol>
                      <IonIcon icon={add} size="large" onClick={() => handleQtyInc(item.id)}>+</IonIcon>
                    </IonCol>
                    <IonCol>
                      <IonIcon icon={remove} size="large" onClick={() => handleQtyDec(item.id)}>-</IonIcon>
                    </IonCol>
                  </IonRow>
                </IonItem>
              </IonCard>
            ))
          )}
        </IonList>
        <IonModal ref={modal} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)}>
          <IonHeader>
            <IonToolbar color="success" style={{fontSize:"2em"}}>
              <IonRow className="ion-align-items-center ion-text-center">
                <IonCol size="2">
                 <IonIcon onClick={() => setIsOpen(false)} icon={arrowBack} />
                </IonCol>
                <IonCol size="8">
                  <span>Payment</span>
                </IonCol>
                <IonCol size="2"></IonCol>
              </IonRow>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonRow>
              <IonCol size="12">
                <IonItem style={{border:"1px solid #ccc",fontSize:"1.4em"}} onClick={() => modal.current?.setCurrentBreakpoint(0.75)}>
                  <IonIcon color="medium" slot="start" src={location} />
                  <span>Choose Current Location</span>
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem style={{border:"1px solid #ccc",fontSize:"1.4em"}} onClick={() => setIsOpen(false)} routerLink="/addnewaddress">
                  <IonIcon slot="start" src={add} />
                  <span>Add New Address</span>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonList> {/* Fetched Addresses */}
              {addresses2.map((entry: any) => (
                <IonItem key={entry.id}>
                  <IonRow style={{width:"100%"}}>
                    <IonCol size="2">
                      <IonRadio
                        onClick={() => setSelectedAddress(entry.attributes.addressTitle.toString())}
                        value={entry.id.toString()}
                        checked={selectedAddress === entry.id.toString()}
                        onIonSelect={() => setSelectedAddress(entry.id.toString())} />
                    </IonCol>
                    <IonCol size="8">
                      <IonLabel onClick={() => setSelectedAddress(entry.id.toString())}>
                        <h2>{entry.attributes.AddressTitle}</h2>
                        <p>{entry.attributes.AddressDescription}</p>
                      </IonLabel>
                    </IonCol>
                    <IonCol size="2">
                      <IonButton fill="outline" onClick={() => handleEditAddress(entry.id)}>
                        <IonIcon src={pencil} />
                      </IonButton>
                      <IonButton fill="outline" onClick={() => handleDeleteAddress(entry.id)}>
                        <IonIcon src={trash} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonItem>
              ))}
              <IonItem lines="none">Do you have a promo Code/Coupon ?</IonItem>
              <IonInput fill="outline" placeholder="Enter your code" >
                <IonIcon style={{fontSize:"1.6em",color:"#92949C"}} slot="start" icon={pricetag} />
              </IonInput>
              <IonButton style={{border:"1px solid #ccc",padding:"5px"}} expand="block" fill="clear">
                <span style={{fontSize:"2em"}}>Apply Now</span>
              </IonButton>
              <IonRadioGroup value={selectedValue} onIonChange={e => handleRadioChange(e.detail.value!)}>
                <IonItem button onClick={() => handleRadioChange('cashOnDelivery')}>
                  <IonRow style={{ width: "100%" }}>
                    <IonCol size="2">
                      <IonRadio value="cashOnDelivery"></IonRadio>
                    </IonCol>
                    <IonCol size="10">
                      <span>Cash On Delivery</span>
                    </IonCol>
                  </IonRow>
                </IonItem>
                <IonItem button onClick={() => handleRadioChange('upi')}>
                  <IonRow style={{ width: "100%" }}>
                    <IonCol size="2">
                      <IonRadio value="upi"></IonRadio>
                    </IonCol>
                    <IonCol size="10">
                      <span>UPI</span>
                    </IonCol>
                  </IonRow>
                </IonItem>
                <IonItem button onClick={() => handleRadioChange('wallet')}>
                  <IonRow style={{ width: "100%" }}>
                    <IonCol size="2">
                      <IonRadio value="wallet"></IonRadio>
                    </IonCol>
                    <IonCol size="10">
                      <span>Wallet</span>
                    </IonCol>
                  </IonRow>
                </IonItem>
                <IonItem button onClick={() => handleRadioChange('card')}>
                  <IonRow style={{ width: "100%" }}>
                    <IonCol size="2">
                      <IonRadio value="card"></IonRadio>
                    </IonCol>
                    <IonCol size="10">
                      <span>Credit / Debit Card</span>
                    </IonCol>
                  </IonRow>
                </IonItem>
              </IonRadioGroup>
            </IonList>
            <div>{renderPaymentContent()}</div>
          </IonContent>
        </IonModal>
        <IonImg src={coupon} />
        <IonRow>
          <IonCol size="12" className="ion-text-center">
            <span>Promo code can be applied on payment screen</span>
          </IonCol>
        </IonRow>
      </Common>
      <IonFooter>
        {cartItems.length === 0 ? (
          <p className="ion-text-center">Your cart is empty</p>
        ) : (
          <>
            <IonList>
              <IonItem>
                <span>Total MRP:</span>
                <span slot="end">₹{totalAmount}</span>
              </IonItem>
              <IonItem>
                <span>Discount:</span>
                <span slot="end">₹{"0.00"}</span>
              </IonItem>
              <IonItem>
                <span>Shipping Charge:</span>
                <span slot="end">{"Free"}</span>
              </IonItem>
              <IonItem color="secondary">
                <span>Total Amount:</span>
                <span slot="end">₹{totalAmount}</span>
              </IonItem>
            </IonList>
            <IonRow className="ion-text-center">
              <IonCol size="12">
                <IonButton color="success" onClick={handleCheckout}>
                  <span style={{fontSize:"2em"}}>Check Out</span>
                </IonButton>
              </IonCol>
            </IonRow>
          </>
        )}
      </IonFooter>
      <TabBar />
    </IonPage>
  );
};

export default Cart;
