import React, { useState, useEffect } from 'react';
import { IonPage, IonSearchbar, IonCard, IonImg, IonCol, IonRow } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { useHistory } from 'react-router';
import { URL } from '../helpers/url';
import axios from 'axios';

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

const Categories: React.FC = () => {
  const history = useHistory();
  const [categoryName,setCategoryName] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  const categoryImage: { [key: string]: string } = {
    "Fruits and Vegetables": fruitsAndVegetable,
    "Dals and Pulses": dalsAndPulses,
    "Spices and Herbs": spicesAndHerbs,
    "Rice and Grains": RiceAndGrains,
    "Cooking Oils and Ghee": cookingOilsAndGhee,
    "Bakery and Snacks": bakeryAndSnacks,
    "Organic and Health Foods": organicAndHealthFood,
    "Dairy and Eggs": dairyAndEggs,
    "Beverages": beverages,
    "Sweets and Desserts": sweetAndDesserts,
    "Ready-to-Cook and Instant Foods": readyToCookAndInstantFood,
    "Household Supplies": householdSupplies,
    "Personal Care": personalCare,
    "Baby Products": babyProducts,
    "Healthcare": healthCare,
    "Pet Care": petCare,
    "Deals of the week": "https://via.placeholder.com/150?text=Deals of the Week"
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/api/grocery-lists?populate=*`);
        const jsonData = JSON.stringify(response.data);
        console.log(jsonData);
        
        const categories:any = Array.from(new Set(response.data.data.map((entry: { attributes: { category: any; }; }) => entry.attributes.category)));
        setCategoryName(categories.filter((category: string) => category !== 'Deals of the week'));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  
  const handleCategoryClick = (category: string) => {
    history.push(`/categoryDetailspage/${encodeURIComponent(category)}`);
  };

  return (
    <IonPage>
      <Header showMenu showCart title="Categories" />
      <Common>
        <IonSearchbar style={{position:"sticky",top:"0",zIndex:"1",background:"#fff"}} value={searchQuery} onIonChange={e => setSearchQuery(e.detail.value!)} />
        <IonRow className="ion-text-center">
          {categoryName?.map((category: string) => (
            <IonCol className="ion-no-padding" size="6" key={category}>
              <IonCard onClick={() => handleCategoryClick(category)}>
                {/* You can replace the image src with your own */}
                <IonImg style={{height:"150px"}} src={categoryImage[category]} /> {/* https://via.placeholder.com/150?text=${category} */}
                <span>{category}</span>
              </IonCard>
            </IonCol>
          ))}
        </IonRow>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default Categories;
