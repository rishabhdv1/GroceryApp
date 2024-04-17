import { IonButton, IonCol, IonContent,  IonIcon,  IonImg,  IonItem,  IonList,  IonPage, IonRow } from '@ionic/react';
import {  } from 'react';

import Header from '../components/Header';
import { add } from 'ionicons/icons';
import TabBar from '../components/TabBar';
import { useParams } from 'react-router';
import Common from '../components/Common';

const Detail: React.FC = () => {
  const {product} = useParams<{product: string}>();

  return (
    <IonPage>
      <Header showBackButton title="Grocery" />
      <Common>
        <IonList>
          <IonItem>
            <span>Haldiram's {product}, 1 kg Tin</span>
          </IonItem>
          <IonItem>
            <IonRow style={{width:"100%",fontSize:"1.2em"}}>
              <IonCol size="6">MRP: <strike>₹{"225"}</strike></IonCol>
              <IonCol size="6">Price: ₹{"225"}</IonCol>
            </IonRow>
          </IonItem>
          <IonImg src="https://www.bigbasket.com/media/uploads/p/m/101212_2-haldirams-rasgulla.jpg?tr=w-1920,q=80" />
          <div style={{overflowX:"auto",whiteSpace:"nowrap"}}>
            <IonButton style={{width:"80px"}}>
              <IonImg src="https://www.bigbasket.com/media/uploads/p/m/101212_2-haldirams-rasgulla.jpg?tr=w-1920,q=80" />
            </IonButton>
            <IonButton style={{width:"80px"}}>
              <IonImg src="https://www.bigbasket.com/media/uploads/p/m/101212_2-haldirams-rasgulla.jpg?tr=w-1920,q=80" />
            </IonButton>
            <IonButton style={{width:"80px"}}>
              <IonImg src="https://www.bigbasket.com/media/uploads/p/m/101212_2-haldirams-rasgulla.jpg?tr=w-1920,q=80" />
            </IonButton>
            <IonButton style={{width:"80px"}}>
              <IonImg src="https://www.bigbasket.com/media/uploads/p/m/101212_2-haldirams-rasgulla.jpg?tr=w-1920,q=80" />
            </IonButton>
            <IonButton style={{width:"80px"}}>
              <IonImg src="https://www.bigbasket.com/media/uploads/p/m/101212_2-haldirams-rasgulla.jpg?tr=w-1920,q=80" />
            </IonButton>
            <IonButton style={{width:"80px"}}>
              <IonImg src="https://www.bigbasket.com/media/uploads/p/m/101212_2-haldirams-rasgulla.jpg?tr=w-1920,q=80" />
            </IonButton>
          </div>
        </IonList>
        <IonList>
          <IonItem>
            <span>Haldiram's {product}</span>
          </IonItem>
          <IonItem>
            <span>About the product</span><br/>
          </IonItem>
          <IonItem>
            <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem, recusandae. Velit pariatur quam eligendi quaerat nesciunt praesentium, libero porro! Sapiente vitae nesciunt sequi obcaecati et quod atque alias corrupti fugit.</small>
          </IonItem>
          <IonItem>
            <span>Ingredients</span>
            <IonIcon slot="end" icon={add} />
          </IonItem>
          <IonItem>
            <span>Nutrirional Facts</span>
            <IonIcon slot="end" icon={add} />
          </IonItem>
          <IonItem>
            <span>Other product Info</span>
            <IonIcon slot="end" icon={add} />
          </IonItem>
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
