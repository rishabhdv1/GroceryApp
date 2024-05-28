import React from 'react';
import { IonPage, IonCard, IonCardContent, IonRow, IonCol, IonText, IonContent, IonItem } from '@ionic/react';
import Common from '../components/Common';
import Header from '../components/Header';
import TabBar from '../components/TabBar';

const steps = [
  {
    label: 'Cashback Received',
    transactionId: '25917892598342',
    amount: '200',
    color: 'green',
    date: '2024-05-25',
  },
  {
    label: 'Spent On Order',
    transactionId: '2343243245342',
    amount: '5000',
    color: 'red',
    date: '2024-05-26',
  },
  {
    label: 'Cashback Received',
    transactionId: '23289282638462',
    amount: '30',
    color: 'green',
    date: '2024-05-27',
  },
];

const MyStepper: React.FC = () => {
  return (
    <IonPage>
      <Header showBackButton title="My Wallet" />
      <Common>
        {steps.map((step, index) => (
          <div className="step" key={index}>
            <IonRow style={{paddingTop:"10px"}}>
              <IonCol size="1">
                <div className="circle"></div>
              </IonCol>
              <IonCol size="11">
                <span className="date">{step.date}</span>
                <IonCard style={{width:"100%",top:"20px",boxShadow:"none",border:"1px solid #ccc"}}>
                  <IonCardContent>
                    <IonText>
                      <h2>{step.label}</h2>
                      <p>Transaction Id: {step.transactionId}</p>
                    </IonText>
                    <IonText slot="end" color={step.color}>
                      <span style={{color:step.color,fontSize:"1.6em"}}>₹{step.amount}</span>
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </div>
        ))}
      </Common>
      <TabBar />
    </IonPage>
  );
};

export default MyStepper;
