import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { URL } from '../helpers/url';

const Delete: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [entryData,setEntryData] = useState([]);
  const [cardData,setCardData] = useState([]);

  useEffect(() => {
    const Entries = async () => {
        try {
            const response3 = await axios.get(`${URL}/api/news`);
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
    console.log('title:', title);
    console.log('description:', description);

    const payload = {
      "data": {
        "Title": title,
        "description": description,
      }
    };

    fetch('${URL}/api/news', {
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
      setTitle('');
      setDescription('');
    })
    .catch(error => console.error('Fetch error:', error));
  };

  return (
    <IonPage>
      <Header title="Tab3" />
      <IonContent fullscreen>
        <IonRow>
          <IonCol size="12">
            <IonInput value={title} onInput={(e:any) => setTitle(e.target.value)} fill="outline" label="Title" />
          </IonCol>
          <IonCol size="12">
            <IonInput value={description} onInput={(e:any) => setDescription(e.target.value)} fill="outline" label="Description" />
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
              <span>{card.attributes.Title}</span>
              <span>{card.attributes.description}</span>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Delete;