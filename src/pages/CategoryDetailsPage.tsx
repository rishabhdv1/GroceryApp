import React, { useState, useEffect } from 'react';
import { IonBadge, IonCard, IonCol, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonRow, IonSearchbar } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';
import { useHistory, useParams } from 'react-router';
import { nutrition } from 'ionicons/icons';

const CategoryDetailsPage: React.FC = () => {
    const { categoryNameFilter } = useParams<{ categoryNameFilter: any }>();
    const [searchText, setSearchText] = useState('');
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [entryData, setEntryData] = useState<any[]>([]);
    const [categoryName, setCategoryName] = useState<any>([]);
    const history = useHistory();

    function useDebounce(value: any, delay: number) {
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

    const allSuggestions = ["rice", "bread", "biscuits", "cheese", "vegetables", "mango", "tea", "namkeen", "egg", "mop"];

    useEffect(() => {
        if (searchText) {
            // Filter suggestions based on the search text
            const filteredSuggestions = allSuggestions.filter(suggestion =>
                suggestion.toLowerCase().includes(searchText.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [searchText]);

    useEffect(() => {
        const fetchEntries = async () => {
            try {
                const response3 = await axios.get(`${URL}/api/grocery-lists?populate=*&filters[category][$eq]=${categoryNameFilter}`, {
                    headers: {
                        "ngrok-skip-browser-warning": true,
                        'Accept': 'application/json'
                    }
                });
                console.log("Grocery List >>", response3.data.data);
                const categories = Array.from(new Set(response3.data.data.map((entry: { attributes: { category: any; }; }) => entry.attributes.category)));
                console.log("Category", categories);
                setCategoryName(categories);
                setEntryData(response3.data.data);
            } catch (error) {
                console.error('Error fetching data from Strapi:', error);
            }
        };
        fetchEntries();
    }, [categoryNameFilter]);

    const handleCategoryClick = (categoryData: string) => {
        const remainingEntries = entryData.filter(
            (entry: any) => entry.attributes.category === categoryData
        );
        history.push(`/categoryDetailspage/${encodeURIComponent(categoryData)}`, {
            remainingEntries: remainingEntries.slice(4), // Pass remaining entries excluding the first 4
        });
    };

    return (
        <IonPage>
            <Header showBackButton title={categoryName} />
            <Common>
                <div style={{ position: "sticky", top: "0", zIndex: "10", background: "#fff" }}>
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
                {entryData.length === 0 ? (
                    <IonRow style={{fontSize:"1.8em"}} className="ion-text-center vCenter">
                        <IonCol size="12">
                            <IonIcon style={{fontSize:"1.5em"}} icon={nutrition} />
                        </IonCol>
                        <IonCol size="12">
                            <IonLabel>No items added yet</IonLabel>
                        </IonCol>
                    </IonRow>
                ) : (
                    categoryName.map((categoryData: any) => (
                        <div key={categoryData}>
                            <IonRow className="ion-text-center">
                                {entryData
                                    .filter(
                                        (entry: any) => entry.attributes.category === categoryData
                                    )
                                    .map((entry: any) => (
                                        <IonCol className="ion-no-padding" size="6" key={entry.id}>
                                            <IonCard routerLink={`/detail/${entry.id}`}>
                                                <IonImg
                                                    style={{ height: "150px" }}
                                                    src={URL + entry.attributes.productImage.data[0].attributes.url}
                                                />
                                                <span>{entry.attributes.name}</span>
                                                <br />
                                                <IonRow>
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
                                            </IonCard>
                                        </IonCol>
                                    ))}
                            </IonRow>
                        </div>
                    ))
                )}
            </Common>
            <TabBar />
        </IonPage>
    );
};

export default CategoryDetailsPage;
