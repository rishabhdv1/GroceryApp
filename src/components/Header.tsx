import { IonBackButton, IonButton, IonCol, IonHeader, IonIcon, IonMenuButton, IonRow, IonToolbar } from "@ionic/react";
import { cart, notifications } from "ionicons/icons";

export default function Header(props:any) {
    return (
        <IonHeader>
            <IonToolbar>
                <IonRow className="ion-align-items-center">
                    <IonCol size="2">
                        {
                            !! props.showMenu &&
                            <IonMenuButton style={{fontSize:"2em"}} />
                        }
                        {
                            !! props.showBackButton &&
                            <IonBackButton defaultHref="/home" />
                        }
                    </IonCol>
                    <IonCol size="8" className="ion-text-center" style={{fontSize:"1.8em"}}>
                        <strong style={{overflowX:"auto",whiteSpace:"nowrap"}}>{props.title}</strong>
                    </IonCol>
                    <IonCol size="2">
                        {/* {
                            !! props.showCart &&
                            <IonButton fill="clear" routerLink="/cart">
                                <IonIcon color="dark" size="large" icon={cart} />
                            </IonButton>
                        } */}
                    </IonCol>
                </IonRow>
            </IonToolbar>
        </IonHeader>
    )
}