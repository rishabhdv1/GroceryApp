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
import axios from 'axios';

const Tab1: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchText, 300); // 300 ms delay
  const [cardData2,setCardData2] = useState();

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

  
  const allSuggestions = ["rice","bread","biscuits","cheese","vegetables","mango","tea","namkeen","egg","mop"];

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

  useEffect(() => {
    const CardData = async () => {
        try {
            const response = await axios.get('http://localhost:1337/fruits-and-vegetables');
            console.log("DDD >>",response.data.data);
            setCardData2(response.data.data);
        } catch (error) {
          console.error('Error fetching data from Strapi:', error);
        }
    };
    CardData();
  }, []);

  const CardData1 = [
    {
      name: "Fruits & Vegetables",
      images: [
        { id: 1, name: "Cauliflower", src: "https://www.bigbasket.com/media/uploads/p/m/10000074_19-fresho-cauliflower.jpg?tr=w-1920,q=80", price: "42.47", offerPrice: "31" },
        { id: 2, name: "Carrot - Orange (Loose)", src: "https://www.bigbasket.com/media/uploads/p/m/10000070_15-fresho-carrot-orange.jpg?tr=w-1920,q=80", price: "84.93", offerPrice: "50" },
        { id: 3, name: "Capsicum - Green (Loose)", src: "https://www.bigbasket.com/media/uploads/p/m/10000067_23-fresho-capsicum-green.jpg?tr=w-1920,q=80", price: "120.55", offerPrice: "64" },
        { id: 4, name: "Coriander Leaves", src: "https://www.bigbasket.com/media/uploads/p/m/10000326_14-fresho-coriander-leaves.jpg?tr=w-1920,q=80", price: "273.97", offerPrice: "200" },
      ]
    },
    {
      name: "Dals & Pulses",
      images: [
        { id: 5, name: "Unpolished Toor Dal/Arhar Dal", src: "https://www.bigbasket.com/media/uploads/p/m/40289045_2-tata-sampann-unpolished-toorarhar-dal-rich-in-protein-loaded-with-nutrients.jpg?tr=w-1920,q=80", price: "515", offerPrice: "463.5" },
        { id: 6, name: "Toor Dal/Togari Bele - Desi", src: "https://www.bigbasket.com/media/uploads/p/m/10000425_15-bb-royal-toor-dalarhar-dal-desi.jpg?tr=w-1920,q=80", price: "250", offerPrice: "195.5" },
        { id: 7, name: "Urad Dal/Uddina - Split", src: "https://www.bigbasket.com/media/uploads/p/m/30010377_11-bb-popular-urad-dal-split.jpg?tr=w-1920,q=80", price: "150", offerPrice: "210" },
        { id: 8, name: "Peanuts/Kadalekaye - Raw", src: "https://www.bigbasket.com/media/uploads/p/m/30000120_14-bb-royal-peanutsmungaphalishengdana-raw.jpg?tr=w-1920,q=80", price: "50", offerPrice: "37" },
      ]
    },
    {
      name: "Ready to Cook & Instant Foods",
      images: [
        { id: 7, name: "2-Minute Instant Noodles - Masala", src: "https://www.bigbasket.com/media/uploads/p/m/266109_23-maggi-2-minute-instant-noodles-masala.jpg?tr=w-1920,q=80", price: "100", offerPrice: "112" },
        { id: 8, name: "Instant Tomato Chatpata Cup-A-Soup", src: "https://www.bigbasket.com/media/uploads/p/m/1214922_2-knorr-instant-tomato-chatpata-cup-a-soup.jpg?tr=w-1920,q=80", price: "75", offerPrice: "100" },
      ]
    },
    {
      name: "Sweets & Deserts",
      images: [
        { id: 9, name: "Rasgulla - Syrup-based Dessert, Soft & Spongy", src: "https://www.bigbasket.com/media/uploads/p/m/101212_2-haldirams-rasgulla.jpg?tr=w-1920,q=80", offerPrice: "255", weight: "1 kg - Tin" },
        { id: 10, name: "Ready Mix - Vermicelli Payasam", src: "https://www.bigbasket.com/media/uploads/p/m/265940_5-mtr-ready-mix-vermicelli-payasam.jpg?tr=w-1920,q=80", offerPrice: "75", weight: "180 g - Pouch" },
        { id: 11, name: "Soan Cake - Regular, Traditional Delicacy/Sweets, Desert, For", src: "https://www.bigbasket.com/media/uploads/p/m/40261712_1-grb-soan-cake-regular-traditional-delicacysweets-dessert-for-celebrations-special-ocassions.jpg?tr=w-1920,q=80", offerPrice: "50", weight: "100 g - Box" },
        { id: 12, name: "Soan Cake - Butterscotch, Traditional Delicacy/Sweets,", src: "https://www.bigbasket.com/media/uploads/p/m/40261713_1-grb-soan-cake-butterscotch-traditional-delicacysweets-dessert-for-celebrations-special-occasions.jpg?tr=w-1920,q=80", offerPrice: "40", weight: "100 g - Box" },
      ]
    },
  ];

  return (
    <IonPage>
      <Header showMenuButton showNot title="Grocery" />
      <Common>
        <div style={{position:"sticky",top:"0",zIndex:"10",background:"#fff"}}>
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
                <IonRow className="ion-text-center">
                  {entry.images.map((image:any) => (
                    <IonCol className="ion-no-padding" size="6" key={image.id}>
                      <IonCard routerLink={`/detail/${encodeURIComponent(image.name)}`}>
                        <IonImg style={{height:"150px"}} src={image.src} />
                        <span>{image.name}</span><br/>
                        <IonRow>
                          <IonCol>
                            <strong>₹{image.offerPrice}</strong>
                          </IonCol>
                          <IonCol>
                            <strike>₹{image.price}</strike>
                          </IonCol>
                        </IonRow>
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
