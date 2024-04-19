import { IonCard, IonCol, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow } from '@ionic/react';
import './Tab2.css';
import Header from '../components/Header';
import image1 from "../assets/fashion.png"
import image2 from "../assets/mobile.png"
import image3 from "../assets/electronic.png"
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { chevronForwardCircle } from 'ionicons/icons';

const Tab2: React.FC = () => {
  const groceryCategories = [
    {id: 1, name: "Fruits & Vegetables", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzY7koGwv3DRwTS7UMwZbh2Y11EVX9IUJgOQRqpgV3vYmG9pQE7_70qnNShaSb" },
    {id: 2, name: "Dals & Pulses", src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-x9rcp_l3Uon0pA8jX35HD2r41Kc1Lg7vugJs5yVbPqSXI0oipge0wdrZIDis" },
    {id: 3, name: "Spices & Herbs", src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTi7DVCdkckZmdchFb23SnaImtZN2f_N7kg39GI2Qdz_0ApUn4B2SeuqqkWFc-G" },
    {id: 4, name: "Rice & Grains", src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTT14e-bmtyhNZF1bcTvPnnA9ydvvVmKJBksS1zk3C-OMkyNIYhfvXAqFaiHiVr" },
    {id: 5, name: "Cooking Oils & Ghee", src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQ-31qOGQEZygeAxNlTU-QzegeB56hYBwv3SZ4-5MeJAvPW9Jg3Q9OXtt4_7KLe" },
    {id: 6, name: "Bakery & Snacks", src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSjdphULpPncAcxsMwkEMeQqYLeV8PMomN0Lt-UAn2kB5gBz3cL9N8XEPTeYEFK" },
    {id: 7, name: "Organic and Health Foods", src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTsiks3E1LeLqCbmO_PN1ETdV2fHw6w3q5ZBJBoux_0AH0evI7sfsc_WDMIXSgC" },
    {id: 8, name: "Dairy & Eggs", src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRVk9R8pce4xFWXjRDCgnO45qKobC0XZR2qm-AW7-HlMk4cY_MDr6QRoC8q9wou" },
    {id: 9, name: "Beverages", src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTZTYM7HRbbFV9R7E85K3NGIXhLpsRAhJYcoyZNLE5dGfKamCbxrzpX7hYmBASd" },
    {id: 10, name: "Sweets & Desserts", src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR5zo60ZKDFIalHV7TcswUipL8GLmIamz2S59X5aADTH6N6YcLTmgJ1FUUxJZ49" },
    {id: 11, name: "Ready-to-Cook & Instant Foods", src: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTOzAmnB6x65ADFk4rSgDa23MWQj2Kp1Gx831BuE9IbNfAqe6B9BP6LTJVJyrBG" },
    {id: 12, name: "Household Supplies", src: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRUOQZkVuYwUJrUkaMKnnPXj_tPG9qJXNADmEaqe-u1gmkYgaqMtk3yjpTWyXSD" },
    {id: 13, name: "Personal Care", src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSld94i-7WfOO2ZpGyqqUShWx2GiHLOJm9Keb3Q78bJa49024SjjhKItnOdf5Ap" },
    {id: 14, name: "Baby Products", src: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTGl4hUrfbXTWyjkGYmBVUWMrmPYsDfVbCyiA_GCK4bnNrU3s9LBURUdz9l5zWy" },
    {id: 15, name: "Healthcare", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk0ED5zga9OjYgWDDwsKM4VXZMOgPWD3XmRboDXzid7bZL4t3wbFj6o30bN1-W" },
    {id: 16, name: "Pet Care", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKqSiBnD7_7stnJ2jtVjR74zDJh2OL-kvdWynVcuUx6YmFy5yFpIoNQb-84fWC" },
  ]
  
  return (
    <IonPage>
      <Header showBackButton title="Categories" />
      <Common>
        <IonRow>
          <div>
            <IonRow className="ion-text-center">
              {groceryCategories.map((entry:any) => (
                <IonCol className="ion-no-padding" size="6" key={entry.id}>
                  <IonCard>
                    <IonImg style={{height:"150px"}} src={entry.src} />
                    <span>{entry.name}</span>
                  </IonCard>
                </IonCol>
              ))}
            </IonRow>
          </div>
        </IonRow>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Tab2;
