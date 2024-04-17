import { IonCard, IonCol, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSearchbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import image1 from "../assets/m4/casual_shoes.jpeg"
import image2 from "../assets/m4/casual_shoes2.jpeg"
import image3 from "../assets/m4/gloves.jpeg"
import image4 from "../assets/m4/mufflers.jpeg"
import image5 from "../assets/m4/shavers.jpeg"
import image6 from "../assets/m4/sleeves.jpeg"

import electro1 from "../assets/electro/canon.jpeg"
import electro2 from "../assets/electro/powerbank.jpeg"
import electro3 from "../assets/electro/printer.jpeg"
import electro4 from "../assets/electro/printer2.jpeg"
import electro5 from "../assets/electro/printer3.jpeg"
import electro6 from "../assets/electro/quantum.webp"


import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/keyboard';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/zoom';
import '@ionic/react/css/ionic-swiper.css';
import './Tab1.css';
import Header from '../components/Header';
import { chevronForwardCircle } from 'ionicons/icons';
import TabBar from '../components/TabBar';
import Common from '../components/Common';

const Tab1: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchText, 300); // 300 ms delay

  function useDebounce(value:any, delay:any) {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  }

  
  const allSuggestions = ["mobile 5g", "mobiles", "mobile phone", "mobile stand", "vivo mobiles 5g", "Laptops", "laptop hp", "laptop bag", "laptop stand", "laptop table", "laptop dell"];

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Filter suggestions based on the debounced search term
      const filteredSuggestions = allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchTerm]);

  const CardData1 = [
    { 
      id: 1, 
      name: "Fashion",
      images: [
        { id: 1, src: image1 },
        { id: 2, src: image2 },
        { id: 3, src: image3 },
        { id: 4, src: image4 },
      ]
    },
    { 
      id: 2, 
      name: "Electronics",
      images: [
        { id: 5, src: electro1 },
        { id: 6, src: electro2 },
        { id: 7, src: electro3 },
        { id: 8, src: electro4 },
      ]
    },
  ];
  const CardData2 = [
    { 
      id: 1, 
      name: "Fashion 2",
      images: [
        { id: 1, src: image1 },
        { id: 2, src: image2 },
        { id: 3, src: image3 },
        { id: 4, src: image4 },
        { id: 5, src: image5 },
        { id: 6, src: image6 },
      ]
    },
    { 
      id: 2, 
      name: "Electronics 2",
      images: [
        { id: 5, src: electro1 },
        { id: 6, src: electro2 },
        { id: 7, src: electro3 },
        { id: 8, src: electro4 },
        { id: 9, src: electro5 },
        { id: 10, src: electro6 },
      ]
    },
  ];

  return (
    <IonPage>
      <Header title="Grocery" />
      <Common>
        <div style={{position:"sticky",top:"0",zIndex:"10"}}>
          <IonSearchbar value={searchText} onIonInput={e => setSearchText(e.detail.value!)} placeholder="Type something..." />
          <IonCard>
            {suggestions.map((suggestion, index) => (
              <IonItem key={index} button onClick={() => {
                setSearchText(suggestion);
                setSuggestions([]);
              }}>
                <IonLabel>{suggestion}</IonLabel>
              </IonItem>
            ))}
          </IonCard>
        </div>
        <Swiper autoplay={{ delay: 1000 }}>
          <SwiperSlide>
            <IonImg src={"https://rukminim2.flixcart.com/fk-p-flap/480/210/image/5ab6c3bf39f51b16.png?q=20"} />
          </SwiperSlide>
          <SwiperSlide>
            <IonImg src={"https://rukminim2.flixcart.com/fk-p-flap/480/210/image/ae998eabbadcb672.png?q=20"} />
          </SwiperSlide>
          <SwiperSlide>
            <IonImg src={"https://rukminim2.flixcart.com/fk-p-flap/480/210/image/5d6d99915aa7515b.png?q=20"} />
          </SwiperSlide>
        </Swiper>

          {CardData1.map((entry:any)=>(
            <IonCard>
              <div key={entry.id}>
                <IonItem>
                  <IonLabel>{entry.name}</IonLabel>
                  <IonIcon slot="end" icon={chevronForwardCircle} />
                </IonItem>
                <IonRow>
                  {entry.images.map((image:any) => (
                    <IonCol className="ion-no-padding" size="6" key={image.id}>
                      <IonCard>
                        <IonImg style={{height:"150px"}} src={image.src} />
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </div>
            </IonCard>
          ))}
          {CardData2.map((entry2:any)=>(
            <IonCard>
              <div key={entry2.id}>
                <IonItem>
                  <IonLabel>{entry2.name}</IonLabel>
                  <IonIcon slot="end" icon={chevronForwardCircle} />
                </IonItem>
                <IonRow>
                  {entry2.images.map((image:any) => (
                    <IonCol className="ion-no-padding" size="4" key={image.id}>
                      <IonCard>
                        <IonImg style={{height:"150px"}} src={image.src} />
                      </IonCard>
                    </IonCol>
                  ))}
                </IonRow>
              </div>
            </IonCard>
          ))}
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Tab1;
