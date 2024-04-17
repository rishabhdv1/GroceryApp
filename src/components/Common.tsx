import { useRef, useState } from 'react';
import { } from 'ionicons/icons'; // Import
import { IonContent, IonLoading, IonRefresher, IonRefresherContent } from '@ionic/react';

interface ChildComponentProps {
    children: React.ReactNode;
}

const Common: React.FC<ChildComponentProps> = ({children}) => {
    const ionRefresher = useRef<HTMLIonRefresherElement>(null);

    const doRefresh = async (event: CustomEvent) => {
        try {
          window.location.reload();
        } catch (error) {
          console.error('Error during refresh:', error); // Make sure to complete the refresh even in case of an error
        }
    };
  return (
    <>
        <IonContent style={{backgroundColor:"#FFFFFF"}}  fullscreen ref={(ionContent) => ionRefresher.current?.addEventListener('ionRefresh', doRefresh)}>
            <IonRefresher slot="fixed" ref={ionRefresher}>
                <IonRefresherContent />
            </IonRefresher>
            {children}
        </IonContent>
    </>
  );
};

export default Common;
