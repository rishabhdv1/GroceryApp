import React, { useEffect, useRef, useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCheckbox, IonCol, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonRadio, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { add, arrowBack, close, location, pencil, pricetag, remove, trash } from 'ionicons/icons';

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
  const [showNicknameInput,setShowNicknameInput] = useState(Boolean);
  const modal = useRef<HTMLIonModalElement>(null);
  const [selectedAddress, setSelectedAddress] = useState<string | undefined>(() => {
    return localStorage.getItem('selectedAddress') || undefined;
  });
  const [paymentOption,setPaymentOption] = useState();
  const [addresses2,setAddresses] = useState<any[]>([]);
  const [addressTitle,setAddressTitle] = useState();
  const [addressDescription,setAddressDescription] = useState();
  
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
  const handlePaymentOptionSelect = (option: any) => {
    setPaymentOption(option);
    setShowAlert(false);
    switch (option) {
      case "cashOnDelivery":
        setIsOpen(true);
        break;
      case "creditCard":
        alert("Credit Card")
        break;
      default:
        break;
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
                  <IonRow className="ion-align-items-center" style={{width:"100%"}}>
                    <IonCol size="2">
                      <IonImg style={{ width: "50px" }} src={`${URL}${item.imageUrl}`} />
                    </IonCol>
                    <IonCol size="10" className="ion-no-padding">
                      <IonRow className="ion-align-items-center">
                        <IonCol size="11">
                          <IonLabel>
                            <h2>{item.attributes.name}</h2>
                          </IonLabel>
                        </IonCol>
                        <IonCol size="1">
                          <IonIcon style={{fontSize:"1.2em"}} icon={close} onClick={() => removeFromCart(item.id)} />
                        </IonCol>
                        <IonCol size="8">
                          <p className="ion-no-margin">{item.attributes.quantity} for ₹ {item.attributes.price}</p>
                        </IonCol>
                        <IonCol size="4">
                          <IonIcon icon={add} size="large" onClick={() => handleQtyInc(item.id)}>+</IonIcon>
                          <IonIcon icon={remove} size="large" onClick={() => handleQtyDec(item.id)}>-</IonIcon>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonItem>
              </IonCard>
            ))
          )}
        </IonList>
        <IonModal ref={modal} isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} trigger="open-modal">
          <IonHeader>
            <IonToolbar style={{fontSize:"2em"}}>
              <IonRow className="ion-align-items-center ion-text-center">
                <IonCol size="2">
                 <IonIcon icon={arrowBack} />
                </IonCol>
                <IonCol size="8">
                  <span>Payments</span>
                </IonCol>
                <IonCol size="2"></IonCol>
              </IonRow>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonRow>
              <IonCol size="12">
                <IonItem style={{border:"1px solid",fontSize:"1.4em"}} onClick={() => modal.current?.setCurrentBreakpoint(0.75)}>
                  <IonIcon slot="start" src={location} />
                  <span>Choose Current Location</span>
                </IonItem>
              </IonCol>
              <IonCol size="12">
                <IonItem style={{border:"1px solid",fontSize:"1.4em"}} onClick={() => setIsOpen(true)}>
                  <IonIcon slot="start" src={add} />
                  <span>Add New Address</span>
                </IonItem>
              </IonCol>
            </IonRow>
            <IonModal>
              <IonContent className="ion-padding">
                <IonRow>
                  <IonCol size="12">
                    <IonInput fill="outline" label="House No" labelPlacement="floating" />
                  </IonCol>
                  <IonCol size="12">
                    <IonInput fill="outline" label="City Details" labelPlacement="floating" />
                  </IonCol>
                  <IonCol size="12">
                    <IonInput fill="outline" label="Pincode" labelPlacement="floating" />
                  </IonCol>
                  <IonCol size="12">
                    <IonInput fill="outline" label="Area Details" labelPlacement="floating" />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol>
                    <IonButton fill="outline" expand="block" onClick={() => setShowNicknameInput(false)}>Home</IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton fill="outline" expand="block" onClick={() => setShowNicknameInput(false)}>Office</IonButton>
                  </IonCol>
                  <IonCol>
                    <IonButton fill="outline" expand="block" onClick={() => setShowNicknameInput(true)}>Other</IonButton>
                  </IonCol>
                  {showNicknameInput && 
                    <IonCol size="12">
                      <IonInput fill="outline" label="Nickname this address as" labelPlacement="floating" />
                    </IonCol>
                  }
                </IonRow>
              </IonContent>
              <IonFooter className="ion-no-border">
                <IonRow>
                  <IonCol size="12" className="ion-padding">
                    <IonCheckbox labelPlacement="end">Set this as my default delivery address</IonCheckbox>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block" onClick={() => setIsOpen(false)}>
                      <span>Cancel</span>
                    </IonButton>
                  </IonCol>
                  <IonCol size="6">
                    <IonButton expand="block">
                      <span>Save</span>
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonFooter>
            </IonModal>
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
                      <IonButton fill="outline" onClick={() => handleEditAddress(entry)}>
                        <IonIcon src={pencil} />
                      </IonButton>
                      <IonButton fill="outline" onClick={() => handleDeleteAddress(entry)}>
                        <IonIcon src={trash} />
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonItem>
              ))}
              <IonItem lines="none">Do you have a promo Code/Coupon ?</IonItem>
              <IonSearchbar placeholder="Enter you code" searchIcon={pricetag} />
              <IonButton color="dark" expand="block" fill="outline">
                <span style={{fontSize:"2em"}}>Apply Now</span>
              </IonButton>
              <IonSelect fill="outline" label="Choose Payment Method">
                <IonSelectOption value="cod">Cash On Delivery</IonSelectOption>
                <IonSelectOption value="upi">UPI</IonSelectOption>
                <IonSelectOption value="wallet">Wallet</IonSelectOption>
                <IonSelectOption value="card">Credit / Debit Card</IonSelectOption>
              </IonSelect>
            </IonList>
            <IonButton color="success" expand="block">
              <span style={{fontSize:"2em"}}>Continue</span>
            </IonButton>
          </IonContent>
        </IonModal>
        <IonAlert isOpen={showAlert} onDidDismiss={() => setShowAlert(false)} header={'Select Payment Option'}
          buttons={[
            {
              text: 'Cash on Delivery',
              handler: () => {
                handlePaymentOptionSelect('cashOnDelivery');
              }
            },
            {
              text: 'Online',
              handler: () => {
                handlePaymentOptionSelect('creditCard');
              }
            },
          ]}
        />
      </Common>
      <IonFooter>
        {cartItems.length === 0 ? (
          <p className="ion-text-center">Your cart is empty</p>
        ) : (
          <>
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
            <IonItem color="medium">
              <span>Total Amount:</span>
              <span slot="end">₹{totalAmount}</span>
            </IonItem>
            <IonButton color="tertiary" expand="full" onClick={handleCheckout}>
              <span style={{fontSize:"2em"}}>Check Out</span>
            </IonButton>
          </>
        )}
      </IonFooter>
      <TabBar />
    </IonPage>
  );
};

export default Cart;
