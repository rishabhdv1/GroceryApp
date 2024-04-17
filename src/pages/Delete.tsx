/* import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import Header from '../components/Header';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Tab1: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cardData, setCardData] = useState([]);


  useEffect(() => {
    const Cards = async () => {
        try {
            const response = await axios.get('http://localhost:1337/api/rsbs');
            console.log("DDD >>",response.data.data);
            setCardData(response.data.data);
        } catch (error) {
          console.error('Error fetching data from Strapi:', error);
        }
    };
    Cards();
  }, []);


  return (
    <IonPage>
      <Header title="Tab1" />
      <IonContent>
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

export default Tab1; */


/* import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { useState } from 'react';
import Header from '../components/Header';

const Tab3: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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

    fetch('http://localhost:1337/api/rsbs', {
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
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
 */