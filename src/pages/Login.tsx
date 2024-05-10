import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonCol, IonInput, IonInputPasswordToggle, IonPage, IonRow } from '@ionic/react';
import { URL } from '../helpers/url';
import Header from '../components/Header';
import axios from 'axios';
import Common from '../components/Common';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const onLogin = async () => {
   try {
        const response = await axios.post(`${URL}/api/auth/local`, {
            identifier: email,
            password: password,
        });
        // alert("Error-:"+response);

        const data = response.data;
        console.log("Login response:", response);
        console.log("Login data:", data);

        if (response.status === 200) {
            localStorage.setItem("email", email);
            localStorage.setItem("jwt", data.jwt);
            localStorage.setItem("id", data.user.id);
            history.push("/home");
        } else {
            alert("Invalid Email or Password");
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('Login failed. Please try again later.'+error);
    }
  };

  return (
      <IonPage>
        <Header title="Login" />
        <Common>
          <IonRow className="vCenter">
            <IonCol size="12">
              <IonInput label="Email" labelPlacement="floating" fill="outline" value={email} onIonInput={(e) => setEmail(e.detail.value!)} type="email" placeholder="Enter your email" />
            </IonCol>
            <IonCol size="12">
              <IonInput label="Password" labelPlacement="floating" fill="outline" value={password} onIonInput={(e) => setPassword(e.detail.value!)} type="password" placeholder="Enter your password" >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonCol>
            <IonCol size="12" className="ion-text-end">
              <a href="/forget-password">Forget Password?</a>
            </IonCol>
            <IonCol size="12">
              <IonButton expand="block" onClick={onLogin}>
                <span style={{fontSize:"2em"}}>Log In</span>
              </IonButton>
            </IonCol>
            <IonCol size="12" className="ion-text-center">
              <span>Don't have an account?</span>
            </IonCol>
            <IonCol size="12">
              <IonButton fill="outline" expand="block" routerLink="/signup">
                <span style={{fontSize:"2em"}}>Sign Up</span>
              </IonButton>
            </IonCol>
          </IonRow>
        </Common>
      </IonPage>
  );
};

export default Login;
