import React, { useEffect, useState } from 'react';
import { IonCol, IonItem, IonItemOptions, IonItemOption, IonItemSliding, IonList, IonPage, IonRow } from '@ionic/react';
import Header from '../components/Header';
import TabBar from '../components/TabBar';
import Common from '../components/Common';
import axios from 'axios';
import { URL } from '../helpers/url';

interface Notification {
  id: number;
  attributes: {
    Date: string;
    Message: string;
    createdAt: string;
    publishedAt: string;
    updatedAt: string;
  };
}

const Notifications: React.FC = () => {
  const [notificationsData, setNotificationsData] = useState<Notification[]>([]);
  const [message, setMessage] = useState<string>('');
  const [date, setDate] = useState<string>('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`${URL}/api/notifications`);
        console.log("Grocery List >>", response.data.data);
        setNotificationsData(response.data.data);
        if (response.data.data.length > 0) {
          setMessage(response.data.data[0].attributes.Message);
          setDate(response.data.data[0].attributes.Message);
        } else {
          setMessage('');
        }
      } catch (error) {
        console.error('Error fetching data from Strapi:', error);
      }
    };
    fetchNotifications();
  }, []);

  const handleClearNotification = async (id: number) => {
    try {
      // Make an HTTP DELETE request to your backend API to delete the notification
      await axios.delete(`${URL}/api/notifications/${id}`);
      
      // Update the state to reflect the deletion
      const updatedNotifications = notificationsData.filter(notification => notification.id !== id);
      setNotificationsData(updatedNotifications);
    } catch (error) {
      console.error('Error clearing notification:', error);
    }
  };
  

  return (
    <IonPage id="main-content">
      <Header showMenu title="Notifications" />
      <Common>
        <div style={{ backgroundColor: "#F6FAFD", height: "100%" }}>
          {notificationsData.length > 0 ? (
            <IonList>
              {notificationsData.map((entry: Notification) => (
                <IonItemSliding key={entry.id}>
                  <IonItem color={entry.id % 2 === 0 ? "light" : undefined}>
                    <IonRow style={{ width: "100%" }}>
                      <IonCol size="12">
                        <span>{entry.attributes.Message}</span>
                      </IonCol>
                      <IonCol size="12">
                        <div className="ion-text-end" style={{ fontSize: '0.8em', color: 'gray' }}>
                          {entry.attributes.Date}
                        </div>
                      </IonCol>
                    </IonRow>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption onClick={() => handleClearNotification(entry.id)}>
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
      <TabBar />
    </IonPage>
  );
};

export default Notifications;
