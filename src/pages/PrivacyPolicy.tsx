import React, { } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { IonItem, IonList, IonPage } from '@ionic/react';


const PrivacyPolicy: React.FC = () => {
  return (
    <IonPage>
      <Header showBackButton title="Privacy Policy" />
      <Common>
        <IonList>
          <IonItem lines="none" style={{fontSize:"1.2em",fontWeight:"bold"}}>Privacy Policy</IonItem>
          <div className="ion-text-center">Last updated on Nov,2021</div>
          <IonItem lines="none">
            SG Grocery is committed to protecting your privacy. This Privacy Policy explains our data processing practices and your options regarding the ways in which your personal data is used. If you have concerning your personal information or any questions please contact us to given email at  customercare@SGGrocery.us please note that the practices of SG grocery with respect to data collected and used by Grocery Factory only in connection with this website with links to this policy are governed by Grocery Factory privacy policy ("Privacy Policy") as amended from time to time and not the privacy policy in effect at the time the data was collected. Please regularly review our Privacy Policy. If you have objections to the Privacy Policy, you can immediately contact us.
          </IonItem>
          <IonItem lines="none" style={{fontWeight:"bold"}}>Information Collected</IonItem>
          <IonItem lines="none">
            SG grocery collects the details provided by you on registration together with information we learn about you from your use of our service and your visits to our website. We also collect information about the transactions you undertake including details of payment cards used. We may collect additional information in connectio n with your participation in any promotions or competitions offered by us and information you provide when giving us feedback or completing profile forms. We also monitor customer traffic patterns and site usage which enables us to improve the services we provide.
          </IonItem>
          <IonItem lines="none">
            Use of your information and your preferences: We will use your information to provide and personalize our service. We will also use your contact details to regularly communicate with you. We may use your information to send you to offer and news from Grocery Factory and services, for this we may contact you by post, email, or telephone for these purposes. We like to hear your views to help us improve our service.
          </IonItem>
          <IonItem lines="none" style={{fontWeight:"bold"}}>Use of your information and your preferences:</IonItem>
          <IonItem lines="none">
            We will use your information to provide and personalize our service. We will also use your contact details to regularly communicate with you. We may use your information to send you to offer and news from SG Groecery and services, for this we may contact you by post, email, or telephone for these purposes. We like to hear your views to help us improve our service.
          </IonItem>
          <IonItem lines="none" style={{fontWeight:"bold"}}>Legal Disclaimer</IonItem>
          <IonItem lines="none">
            We reserve the right to disclose your personally identifiable information as required by law and when believe it is necessary to share information in order to investigate, prevent, or take action regarding illegal activities, suspected fraud, situations involving potential threats to the physical safety of any person, violations of SG Grocery in terms of use, or as otherwise required by law.
          </IonItem>
          <IonItem lines="none" style={{fontWeight:"bold"}}>Changes in this privacy statement</IonItem>
          <IonItem lines="none">
            SG Grocery reserve the right to modify this privacy statement at any time, so please review it time to time. If we make material changes to this policy, we will notify you here.
          </IonItem>
        </IonList>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default PrivacyPolicy;
