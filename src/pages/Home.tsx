import { IonBadge, IonCol, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSearchbar } from '@ionic/react';
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
  const [entryData,setEntryData] = useState<any[]>([]);
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
            const categories = Array.from(new Set(response3.data.data.map((entry: { attributes: { category: any; }; }) => entry.attributes.category)));
            const available = (response3.data.data[0].attributes.Availability)
            
            // Find the index of "Deals of the week" in categoryName
            const dealsOfWeekIndex = categories.indexOf("Deals of the week");

            // Move "Deals of the week" to the beginning of the array if it exists
            if (dealsOfWeekIndex !== -1) {
              const updatedCategoryName = [
                categories[dealsOfWeekIndex],
                ...categories.slice(0, dealsOfWeekIndex),
                ...categories.slice(dealsOfWeekIndex + 1)
              ];
              setCategoryName(updatedCategoryName);
            } else {
              setCategoryName(categories);
            }

            setEntryData(response3.data.data);
        } catch (error) {
          console.error('Error fetching data from Strapi:', error);
        }
    };
    Entries();
  }, []);


  const filteredEntries = entryData.filter(entry =>
    entry.attributes.name.toLowerCase().includes(searchText.toLowerCase()) ||
    entry.attributes.category.toLowerCase().includes(searchText.toLowerCase())
  );
  
  const handleCategoryClick = (categoryData: string) => {
    const remainingEntries = entryData.filter(
      (entry: any) => entry.attributes.category === categoryData
    );
    history.push(`/categoryDetailspage/${encodeURIComponent(categoryData)}`, {
      remainingEntries: remainingEntries.slice(4), // Pass remaining entries excluding the first 4
    });
  };

  const dealsOfWeekIndex = categoryName.indexOf("Deals of the week");

  return (
    <IonPage>
      <Header showMenu showCart title="Grocery" />
      <Common>
        <div style={{position:"sticky",top:"0",zIndex:"10",background:"#fff"}}>
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Type something..." />
          {suggestions.map((suggestion, index) => (
            <IonItem key={index} button onClick={() => {
              setSearchText(suggestion);
              setSuggestions([]);
            }}>
              <IonLabel>{suggestion}</IonLabel>
            </IonItem>
          ))}
        </div>
        {categoryName.map((categoryData: any) => (
          <div key={categoryData}>
            {categoryData === "Deals of the week" ? (
              <>
                <div style={{border:"1px solid #ccc"}}>
                  <IonItem lines="none" onClick={() => handleCategoryClick(categoryData)}>
                    <span>Deals of the Week</span>
                    <IonIcon
                      slot="end"
                      icon={chevronForwardCircle}
                    />
                  </IonItem>
                  <Swiper slidesPerView={2}>
                    {filteredEntries
                      .filter(
                        (entry: any) => entry.attributes.category === categoryData
                      )
                      .slice(0, 3)
                      .map((entry: any) => (
                        <SwiperSlide key={entry.id}>
                          <IonItem lines="none" routerLink={`/detail/${entry.id}`}>
                            <IonRow className="ion-text-center">
                              <IonCol size="12">
                                <IonImg
                                  style={{ height: "100px" }}
                                  src={URL + entry.attributes.productImage.data[0].attributes.url}
                                />
                              </IonCol>
                              <IonCol size="12">
                                <span>{entry.attributes.name}</span>
                              </IonCol>
                              <IonCol size="12">
                                <IonRow>
                                  <IonCol size="6">
                                    <strong>₹{entry.attributes.offerPrice}</strong><br/>
                                  </IonCol>
                                  <IonCol size="6">
                                    <span style={{ textDecoration: "line-through" }}>
                                      ₹{entry.attributes.price}
                                    </span>
                                  </IonCol>
                                </IonRow>
                              </IonCol>
                            </IonRow>
                          </IonItem>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                </div>
              </>
            ) : (
              <>
                <IonItem style={{borderTop:"1px solid #ccc"}} onClick={() => handleCategoryClick(categoryData)} lines="none">
                  <IonLabel>{categoryData}</IonLabel>
                  <IonIcon
                    slot="end"
                    icon={chevronForwardCircle}
                  />
                </IonItem>
                {/* <IonRow className="ion-text-center">
                  {filteredEntries
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
                </IonRow> */}
                <Swiper slidesPerView={2}>
                    {filteredEntries
                      .filter(
                        (entry: any) => entry.attributes.category === categoryData
                      )
                      .slice(0, 5)
                      .map((entry: any) => (
                        <SwiperSlide key={entry.id}>
                          <IonItem lines="none" routerLink={`/detail/${entry.id}`}>
                            <IonRow className="ion-text-center">
                              <IonCol size="12">
                                <IonImg
                                  style={{ height: "100px" }}
                                  src={URL + entry.attributes.productImage.data[0].attributes.url}
                                />
                              </IonCol>
                              <IonCol size="12">
                                <span>{entry.attributes.name}</span>
                              </IonCol>
                              {entry.attributes.Availability ? (
                                <IonCol size="12">
                                  <IonRow>
                                    <IonCol size="6">
                                      <strong>₹{entry.attributes.offerPrice}</strong><br/>
                                    </IonCol>
                                    <IonCol size="6">
                                      <span style={{ textDecoration: "line-through" }}>
                                        ₹{entry.attributes.price}
                                      </span>
                                    </IonCol>
                                  </IonRow>
                                </IonCol>
                              ) : (
                                <IonCol>
                                  <IonBadge color="danger">
                                    <strong>Unavailable</strong>
                                  </IonBadge>
                                </IonCol>
                              )}
                            </IonRow>
                          </IonItem>
                        </SwiperSlide>
                      ))}
                </Swiper>
              </>
            )}
          </div>
        ))}
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Home;
