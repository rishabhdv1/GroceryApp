import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonCol, IonInput, IonPage, IonRow } from '@ionic/react';
import { URL } from '../helpers/url';
import Header from '../components/Header';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const onLogin = async () => {
        try {
            const response = await fetch(`${URL}/api/auth/local`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    identifier: email,
                    password: password,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                localStorage.setItem("email",email);
                localStorage.setItem("password",password);
                localStorage.setItem("jwt", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzEzNTk5ODU1LCJleHAiOjE3MTYxOTE4NTV9.Mjbm_7jFZi-KiNfUWmGRqyNh-Dll59n-9lC3ZnBiyWI"); // Store the JWT token
                history.push("/tab1"); // Change "/dashboard" to your desired route after login
            } else {
                alert("Invalid Email or Password");
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Login failed. Please try again later.');
        }
    };

    return (
        <IonPage>
          <Header title="LOGIN" />
            <IonRow className="vCenter">
              <IonCol size="12">
                <IonInput
                  label="Email"
                  labelPlacement="floating"
                  fill="outline"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                  type="email"
                  placeholder="Enter your email"
                />
              </IonCol>
              <IonCol size="12">
                <IonInput
                  label="Password"
                  labelPlacement="floating"
                  fill="outline"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                  type="password"
                  placeholder="Enter your password"
                />
              </IonCol>
              <IonCol size="12">
                <IonButton expand="block" onClick={onLogin}>
                  <span style={{fontSize:"2em"}}>LogIn</span>
                </IonButton>
              </IonCol>
              <IonCol size="12" className="ion-text-center">
                <span>Dont have an account?</span>
              </IonCol>
              <IonCol size="12">
                <IonButton fill="outline" expand="block" routerLink="/signup">
                  <span style={{fontSize:"2em"}}>Sign Up</span>
                </IonButton>
              </IonCol>
            </IonRow>
        </IonPage>
    );
};

export default Login;
