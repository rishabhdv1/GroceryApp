import { IonButton, IonCol, IonContent, IonHeader, IonInput, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import Header from '../components/Header';
import { useState } from 'react';
import { useHistory } from 'react-router';
import Common from '../components/Common';

const Login: React.FC = () => {
  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const history = useHistory();
  
  const predefinedEmail = "user1@gmail.com"
  const predefinedPassword = "user1@gmail.com"

  const onLogin = () => {
    if(email === predefinedEmail && password === predefinedPassword){
      localStorage.setItem("email",email)
      localStorage.setItem("password",password)
      history.push("/tab1")
    } else{
      alert("Invalid Email or Password")
    }
  }

  return (
    <IonPage>
      <Common>
        <IonRow>
          <IonCol size="12" className="ion-text-center">
            <span>Email = user1@gmail.com</span><br/>
            <span>Password = user1@gmail.com</span>
          </IonCol>
          <IonCol size="12">
            <IonInput value={email} onIonInput={(e:any) => setEmail(e.target.value)} fill="outline" label="Email" labelPlacement="floating" />
          </IonCol>
          <IonCol size="12">
            <IonInput value={password} onIonInput={(e:any) => setPassword(e.target.value)} fill="outline" label="Password" labelPlacement="floating" />
          </IonCol>
          <IonCol size="12" className="ion-text-end">
            <a href="#">Forgot Password</a>
          </IonCol>
          <IonCol size="12">
            <IonButton expand="block" onClick={onLogin}>
              <span style={{fontSize:"2em"}}>Login</span>
            </IonButton>
          </IonCol>
        </IonRow>
      </Common>
    </IonPage>
  );
};

export default Login;
