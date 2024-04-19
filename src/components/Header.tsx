import { IonBackButton, IonButton, IonCol, IonHeader, IonIcon, IonMenuButton, IonRow, IonToolbar } from "@ionic/react";
import { notifications } from "ionicons/icons";

export default function Header(props:any) {
    return (
        <IonHeader>
            <IonToolbar>
                <IonRow className="ion-align-items-center">
                    <IonCol size="2">
                        {
                            props.showMenuButton &&
                            <IonMenuButton style={{fontSize:"2em"}} />
                        }
                        {
                            props.showBackButton &&
                            <IonBackButton defaultHref="/tab1" />
                        }
                    </IonCol>
                    <IonCol size="8" className="ion-text-center" style={{fontSize:"1.8em"}}>
                        <strong>{props.title}</strong>
                    </IonCol>
                    <IonCol size="2">
                        {
                            !! props.showNot &&
                            <IonButton fill="clear" routerLink="/notification">
                                <IonIcon color="dark" size="large" icon={notifications} />
                            </IonButton>
                        }
                    </IonCol>
                </IonRow>
            </IonToolbar>
        </IonHeader>
    )
}