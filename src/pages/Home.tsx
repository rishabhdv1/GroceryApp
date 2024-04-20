import { IonCard, IonCol, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSearchbar, IonSelect, IonSelectOption } from '@ionic/react';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

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
import { URL } from '../helpers/url';

const Tab1: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchText, 300); // 300 ms delay
  const [selectedCategory, setSelectedCategory] = useState('');
  const [entryData,setEntryData] = useState([]);
  const [categoryName,setCategoryName] = useState<any>([]);


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
    const Entries = async () => {
        try {
            const response3 = await axios.get(`${URL}/api/grocery-lists?populate=*`);
            console.log("Grocery List >>",response3.data.data);
            const categories = Array.from(new Set(response3.data.data.map((entry: { attributes: { category: any; }; }) => entry.attributes.category)));
            console.log("Category",categories);
            setCategoryName(categories);
            setEntryData(response3.data.data);
        } catch (error) {
          console.error('Error fetching data from Strapi:', error);
        }
    };
    Entries();
}, []);

  /* const TypeSelect = (value:any) => {
      console.log("Value",value);
      setSelectedCategory(value);
      if(value == "Fruits & Vegetables"){
        const FetchData = async () => {
          try {
              const response3 = await axios.get(`${URL}/api/fruits-and-vegetables`);
              console.log("Fruits & Vegetables >>",response3.data.data);
              setEntryData(response3.data.data);
          } catch (error) {
            console.error('Error fetching data from Strapi:', error);
          }
        };
        FetchData();
      }
      if(value == "Dals & Pulses"){
        const FetchData = async () => {
          try {
              const response3 = await axios.get(`${URL}/api/dals-and-pulses`);
              console.log("Dals % Pulses >>",response3.data.data);
              setEntryData(response3.data.data);
          } catch (error) {
            console.error('Error fetching data from Strapi:', error);
          }
        };
        FetchData();
      }
      
  } */
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
        {categoryName.map((categoryData:any) => (
            <IonCard key={categoryData}>
                <IonItem>
                  <IonLabel>{categoryData}</IonLabel>
                  <IonIcon slot="end" icon={chevronForwardCircle} />
                </IonItem>
                <IonRow className="ion-text-center">
                  {entryData.map((entry:any) => {
                    if (entry.attributes.category === categoryData) {
                      return (
                          
                            <IonCol className="ion-no-padding" size="6">
                              <IonCard routerLink={`/detail/${entry.id}`}>
                                <IonImg style={{height:"150px"}} src={URL+entry.attributes.productImage.data[0].attributes.url} />
                                <span>{entry.attributes.name}</span><br/>
                                <IonRow>
                                  <IonCol>
                                    <strong>₹{entry.attributes.offerPrice}</strong>
                                  </IonCol>
                                  <IonCol>
                                    <span style={{textDecoration:"line-through"}}>₹{entry.attributes.price}</span>
                                  </IonCol>
                                </IonRow>
                              </IonCard>
                            </IonCol>
                          
                      );
                    } else {
                      return null; 
                    }
                  })}
                </IonRow>
            </IonCard>
        ))}
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Tab1;
