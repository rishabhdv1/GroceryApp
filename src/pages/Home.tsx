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
import Header from '../components/Header';
import { chevronForwardCircle } from 'ionicons/icons';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { useHistory } from 'react-router';

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchText, 300); // 300 ms delay
  const [selectedCategory, setSelectedCategory] = useState('');
  const [entryData,setEntryData] = useState([]);
  const [categoryName,setCategoryName] = useState<any>([]);
  const history = useHistory();

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
  
  const handleCategoryClick = (categoryData: string) => {
    const remainingEntries = entryData.filter(
      (entry: any) => entry.attributes.category === categoryData
    );
    history.push(`/categoryDetailspage/${encodeURIComponent(categoryData)}`, {
      remainingEntries: remainingEntries.slice(4), // Pass remaining entries excluding the first 4
    });
  };
  
  const carousel = [
    {id: 1, image:"https://rukminim2.flixcart.com/fk-p-flap/480/210/image/5ab6c3bf39f51b16.png?q=20" },
    {id: 2, image:"https://rukminim2.flixcart.com/fk-p-flap/480/210/image/ae998eabbadcb672.png?q=20" },
    {id: 3, image:"https://rukminim2.flixcart.com/fk-p-flap/480/210/image/5d6d99915aa7515b.png?q=20" },
  ]

  return (
    <IonPage>
      <Header showMenu showNot title="Grocery" />
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
          {/* <Swiper  autoplay={{ delay: 1000 }}>
            {carousel.map((entry:any)=>(
              <SwiperSlide key={entry.id}>
                <IonImg src={entry.image} />
              </SwiperSlide>
            ))}
          </Swiper> */}
        {categoryName.map((categoryData: any) => (
          <IonCard key={categoryData}>
            <IonItem onClick={() => handleCategoryClick(categoryData)} lines="none">
              <IonLabel>{categoryData}</IonLabel>
              <IonIcon
                slot="end"
                icon={chevronForwardCircle}
              />
            </IonItem>
            <IonRow className="ion-text-center">
              {entryData
                .filter(
                  (entry: any) => entry.attributes.category === categoryData
                )
                .slice(0, 4) // Get only the first 4 entries
                .map((entry: any) => (
                  <IonCol style={{border:"1px solid #ddd"}} className="ion-no-padding" size="6">
                    <IonCard style={{boxShadow:"none"}} routerLink={`/detail/${entry.id}`}>
                      <IonImg
                        style={{ height: "150px" }}
                        src={URL + entry.attributes.productImage.data[0].attributes.url}
                      />
                      <span>{entry.attributes.name}</span>
                      <br />
                      <IonRow>
                        <IonCol>
                          <strong>₹{entry.attributes.offerPrice}</strong>
                        </IonCol>
                        <IonCol>
                          <span style={{ textDecoration: "line-through" }}>
                            ₹{entry.attributes.price}
                          </span>
                        </IonCol>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                ))}
            </IonRow>
          </IonCard>
        ))}

      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Home;
