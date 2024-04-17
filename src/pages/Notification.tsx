import React, { useState } from 'react';
import { IonCol, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonList, IonPage, IonRow,  IonContent } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';

const Notifications: React.FC = () => {
  const [notificationsData, setNotificationsData] = useState([
    "Notification 1",
    "Notification 2",
    "Notification 3",
    "Notification 4"
    // Add more notifications as needed
  ]);

  const handleClearNotification = (index: number) => {
    const updatedNotifications = [...notificationsData];
    updatedNotifications.splice(index, 1);
    setNotificationsData(updatedNotifications);
    window.location.reload();
  };

  return (
    <>
      <IonPage id="main-content">
        <Header showBackButton title="Notifications" />
        <Common>
          <div style={{ backgroundColor: "#F6FAFD", height: "100%" }}>
            {notificationsData.length > 0 ? (
              <IonList>
                {notificationsData.map((text: string, index: number) => (
                  <IonItemSliding key={index}>
                    <IonItem color={index % 2 === 0 ? "light" : undefined}>
                      <IonRow style={{width:"100%"}}>
                        <IonCol size="12">
                          <span>{text}</span>
                        </IonCol>
                        <IonCol size="12">
                          <div className="ion-text-end" style={{ fontSize: '0.8em', color: 'gray' }}>
                            {" 01/01/2023, 12:00 PM"}
                          </div>
                        </IonCol>
                      </IonRow>
                    </IonItem>
                    <IonItemOptions side="end">
                      <IonItemOption onClick={() => handleClearNotification(index)}>
                        Clear
                      </IonItemOption>
                    </IonItemOptions>
                  </IonItemSliding>
                ))}
              </IonList>
            ) : (
              <div id="vCenter" className="ion-text-center vCenter">
                No notifications available.
              </div>
            )}
          </div>
        </Common>
      </IonPage>
    </>
  );
};

export default Notifications;
