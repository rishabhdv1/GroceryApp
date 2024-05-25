import { IonBadge, IonButton, IonButtons, IonCard, IonCol, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonModal, IonPage, IonRow, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
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
import { chevronForwardCircle, gridOutline } from 'ionicons/icons';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { useHistory } from 'react-router';

// Import images from your gallery
import fruitsAndVegetable from "../assets/Categories/Fruits&Vegetables.jpg";
import dalsAndPulses from "../assets/Categories/Dals&Pulses.jpg";
import spicesAndHerbs from "../assets/Categories/Spices&Herbs.jpg";
import RiceAndGrains from "../assets/Categories/Rice&Grains.jpg";
import cookingOilsAndGhee from "../assets/Categories/Cooking_Oils&Ghee.jpg";
import bakeryAndSnacks from "../assets/Categories/Bakery&Snacks.jpg";
import organicAndHealthFood from "../assets/Categories/OrganicandHealthFoods.jpg";
import dairyAndEggs from "../assets/Categories/Dairy&Eggs.jpg";
import beverages from "../assets/Categories/Beverages.jpg";
import sweetAndDesserts from "../assets/Categories/Sweets&Desserts.jpg";
import readyToCookAndInstantFood from "../assets/Categories/Ready-to-Cook&InstantFoods.jpg";
import householdSupplies from "../assets/Categories/Household_Supplies.jpg";
import personalCare from "../assets/Categories/Personal_Car.jpg";
import babyProducts from "../assets/Categories/Baby_Products.jpg";
import healthCare from "../assets/Categories/Healthcare.png";
import petCare from "../assets/Categories/Pet_Care.png";

const Home: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const debouncedSearchTerm = useDebounce(searchText, 300); // 300 ms delay
  const [entryData,setEntryData] = useState<any[]>([]);
  const [categoryName,setCategoryName] = useState<any>([]);
  const [isOpen,setIsOpen] = useState(false);
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
            const response3 = await axios.get(`${URL}/api/grocery-lists?populate=*`, {
              headers: {
                  "ngrok-skip-browser-warning": true,
                  'Accept': 'application/json'
              }
          });
            console.log("Response >>",response3);
            
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
          <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)} placeholder="Search products or brands" />
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
                  <IonItem lines="none">
                    <span>Deals of the Week</span>
                    <span style={{color:"green"}} slot="end" onClick={() => handleCategoryClick(categoryData)}>Explore all</span>
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
                                <IonImg style={{ height: "100px" }} src={URL + entry.attributes.productImage.data[0].attributes.url} />
                              </IonCol>
                              <IonCol size="12">
                                <span className="two-line-limit">{entry.attributes.name}</span>
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
                </div>
              </>
            ) : (
              <>
                <IonItem style={{borderTop:"1px solid #ccc"}} lines="none">
                  <IonLabel>{categoryData}</IonLabel>
                  <span style={{color:"green"}} slot="end" onClick={() => handleCategoryClick(categoryData)}>Explore all</span>
                </IonItem>
                <Swiper slidesPerView={2}>
                    {filteredEntries
                      .filter(
                        (entry: any) => entry.attributes.category === categoryData
                      )
                      .slice(0, 5)
                      .map((entry: any) => (
                        <SwiperSlide key={entry.id}>
                          <IonCard>
                            <IonItem lines="none" routerLink={`/detail/${entry.id}`}>
                              <IonRow className="ion-text-center">
                                <IonCol size="12">
                                  <IonImg style={{ height: "100px" }} src={URL + entry.attributes.productImage.data[0].attributes.url} />
                                </IonCol>
                                <IonCol size="12">
                                  <span className="two-line-limit">{entry.attributes.name}</span>
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
                          </IonCard>
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
