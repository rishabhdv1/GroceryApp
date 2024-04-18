import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonRow, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';

const AddGroceries: React.FC = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [entryData,setEntryData] = useState([]);
  const [cardData,setCardData] = useState([]);
  const [selectedCategory,setSelectedCategory] = useState([]);

  useEffect(() => {
    const Entries = async () => {
        try {
            const response3 = await axios.get(`http://localhost:1337/api/fruits-and-vegetables`);
            console.log("Dashboard >>",response3.data.data);
            setEntryData(response3.data.data);
        } catch (error) {
          console.error('Error fetching data from Strapi:', error);
        }
    };
    Entries();
}, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('name:', name);
    console.log('price:', price);
    console.log('offerPrice:', offerPrice);

    const payload = {
      "data": {
        "name": name,
        "price": price,
        "offerPrice": offerPrice,
      }
    };

    fetch('http://localhost:1337/api/fruits-and-vegetables', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      // Reset input fields after successful submission
      setName('');
      setPrice('');
      setOfferPrice('');
    })
    .catch(error => console.error('Fetch error:', error));
  };

  return (
    <IonPage>
      <Header title="Tab3" />
      <IonContent fullscreen>
        <IonRow>
            <IonCol size="12">
                <IonSelect fill="outline" interface="action-sheet" value={selectedCategory} label="Select a category" onIonChange={e => setSelectedCategory(e.detail.value)}>
                    <IonSelectOption value="Fruits & Vegetables">Fruits & Vegetables</IonSelectOption>
                    <IonSelectOption value="Dals & Pulses">Dals & Pulses</IonSelectOption>
                    <IonSelectOption value="Spices & Herbs">Spices & Herbs</IonSelectOption>
                    <IonSelectOption value="Rice & Grains">Rice & Grains</IonSelectOption>
                    <IonSelectOption value="Cooking Oils & GheC">Cooking Oils & Ghee</IonSelectOption>
                    <IonSelectOption value="Bakery & Snacks">Bakery & Snacks</IonSelectOption>
                    <IonSelectOption value="Organic and Health Foods">Organic and Health Foods</IonSelectOption>
                    <IonSelectOption value="Dairy & Eggs">Dairy & Eggs</IonSelectOption>
                    <IonSelectOption value="Beverages">Beverages</IonSelectOption>
                    <IonSelectOption value="Sweets & Desserts">Sweets & Desserts</IonSelectOption>
                    <IonSelectOption value="Ready-to-Cook & Instant Foods">Ready-to-Cook & Instant Foods</IonSelectOption>
                    <IonSelectOption value="Household Supplies">Household Supplies</IonSelectOption>
                    <IonSelectOption value="Personal Care">Personal Care</IonSelectOption>
                    <IonSelectOption value="Baby Products">Baby Products</IonSelectOption>
                    <IonSelectOption value="Healthcare">Healthcare</IonSelectOption>
                    <IonSelectOption value="Pet Care">Pet Care</IonSelectOption>
                </IonSelect>
            </IonCol>
            <IonCol size="12">
                <input type="file" />
            </IonCol>
            <IonCol size="12">
                <IonInput value={name} onInput={(e:any) => setName(e.target.value)} fill="outline" label="Name" labelPlacement="floating" />
            </IonCol>
            <IonCol size="12">
                <IonInput value={price} onInput={(e:any) => setPrice(e.target.value)} fill="outline" label="Price" labelPlacement="floating" />
            </IonCol>
            <IonCol size="12">
                <IonInput value={offerPrice} onInput={(e:any) => setOfferPrice(e.target.value)} fill="outline" label="Offer Price" labelPlacement="floating" />
            </IonCol>
            <IonCol size="12">
                <IonButton fill="outline" expand="block" onClick={handleSubmit}>
                    <span style={{fontSize:"2em"}}>Submit</span>
                </IonButton>
            </IonCol>
        </IonRow>
        <IonList>
          {cardData && cardData.map((card:any) => (
            <IonItem key={card.id}>
              <span>{card.attributes.name}</span>
              <span>{card.attributes.price}</span>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default AddGroceries;