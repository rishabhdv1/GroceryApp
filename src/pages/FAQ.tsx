import React, { } from 'react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import { IonAccordion, IonAccordionGroup, IonButton, IonCol, IonItem, IonLabel, IonPage, IonRow, IonSelect, IonSelectOption, IonTextarea } from '@ionic/react';


const FAQ: React.FC = () => {
  return (
    <IonPage>
      <Header title="FAQ" />
      <Common>
        <IonRow>
          <IonCol size="12">
            <IonSelect fill="solid" label="Select Category">
              <IonSelectOption>A</IonSelectOption>
              <IonSelectOption>B</IonSelectOption>
              <IonSelectOption>C</IonSelectOption>
              <IonSelectOption>D</IonSelectOption>
              <IonSelectOption>E</IonSelectOption>
            </IonSelect>
          </IonCol>
          <IonCol size="12">
            <IonAccordionGroup>
              <IonRow>
                <IonCol size="12">
                  <IonAccordion value="first">
                    <IonItem slot="header" color="light">
                      <IonLabel>Where do you deliver?</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      First Content
                    </div>
                  </IonAccordion>
                </IonCol>
                <IonCol size="12">
                  <IonAccordion value="second">
                    <IonItem slot="header" color="light">
                      <IonLabel>How can i order at SG Grocery?</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      Placing an order is very simple.  Just register on the SG Grocery website/mobile application, pick your choice of products with a wide range of product selection in the online store and proceed to checkout or just call customer care and place an order. i.e. 1800-123-1947 
                    </div>
                  </IonAccordion>
                </IonCol>
                <IonCol size="12">
                  <IonAccordion value="third">
                    <IonItem slot="header" color="light">
                      <IonLabel>How do i know what time I will receive my delivery?</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      Third Content
                    </div>
                  </IonAccordion>
                </IonCol>
                <IonCol size="12">
                  <IonAccordion value="fourth">
                    <IonItem slot="header" color="light">
                      <IonLabel>What is minimum order value?</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      Fourth Content
                    </div>
                  </IonAccordion>
                </IonCol>
                <IonCol size="12">
                  <IonAccordion value="fifth">
                    <IonItem slot="header" color="light">
                      <IonLabel>What if I want to return something?</IonLabel>
                    </IonItem>
                    <div className="ion-padding" slot="content">
                      Fifth Content
                    </div>
                  </IonAccordion>
                </IonCol>
              </IonRow>
            </IonAccordionGroup>
          </IonCol>
          <IonCol size="12">
            <IonItem>
              <span style={{fontSize:"1.2em",fontWeight:"bold"}}>Not Listed your question/query? </span>
            </IonItem>
            <IonItem>
              <IonTextarea fill="solid" rows={8} placeholder="Write your Question/Query here" />
            </IonItem>
          </IonCol>
          <IonCol size="12">
            <IonButton expand="block" color="success">Submit</IonButton>
          </IonCol>
        </IonRow>
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default FAQ;
