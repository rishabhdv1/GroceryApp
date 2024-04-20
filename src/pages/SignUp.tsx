import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonCol, IonInput, IonItem, IonPage, IonRow } from '@ionic/react';
import { URL } from '../helpers/url';
import Header from '../components/Header';
import axios from 'axios';


const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleSignUp = async () => {
        try {
            const response = await axios.post(`${URL}/auth/local/register`, {
                name: name,
                email: email,
                password: password,
            });
    
            if (response.status === 200) {
                console.log("Sign-up successful!");
                console.log("Name:", name);
                console.log("Email:", email);
                console.log("Password:", password);
                history.push('/login');
            } else {
                // Handle sign-up error
                console.error('Sign-up error:', response.data);
                // Handle the error appropriately, e.g., display an error message to the user
            }
        } catch (error) {
            console.error('Error signing up:', error);
            // Handle any network or other errors
        }
    };
    
    return (
        <IonPage>
          <Header title="SIGN UP" />
            <IonRow className="vCenter">
                <IonCol size="12">
                    <IonInput
                        label="Full Name"
                        labelPlacement="floating"
                        fill="outline"
                        value={name}
                        onIonChange={(e) => setName(e.detail.value!)}
                        type="text"
                        placeholder="Enter your email"
                    />
                </IonCol>
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
                    <IonButton fill="outline" expand="block" onClick={handleSignUp}>
                        <span style={{fontSize:"2em"}}>Sign Up</span>
                    </IonButton>
                </IonCol>
                <IonItem lines="none">
                    <span>Already have an account? <a href="/login">Login</a></span>
                </IonItem>
            </IonRow>
        </IonPage>
    );
};

export default SignUp;
