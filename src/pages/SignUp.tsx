import React, { useState } from 'react';
import { IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonAlert, IonInputPasswordToggle, IonImg, IonList, IonItem, } from '@ionic/react';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
import Common from '../components/Common';
import { URL } from '../helpers/url';
import Logo from '../assets/svg/LoginPage/SGLogo.svg'
import Google from '../assets/svg/LoginPage/google.svg'
import Facebook from '../assets/svg/LoginPage/fb.svg'

const SignUP: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<any>('');
  const [message, setMessage] = useState<any>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userName, setUserName] = useState<any>('');
  const [email, setEmail] = useState<any>('');
  const [phoneNumber, setPhoneNumber] = useState<any>('');
  const [password, setPassword] = useState<any>('');
  const [confirmPassword, setConfirmPassword] = useState<any>('');

  const handlesign = async () => {
      try {
          setLoading(true);
          if(password == confirmPassword){
            const response:any = await axios.post(`${URL}/api/auth/local/register`, {
              'username':userName,
              'email':email,
              'password':password,
          });
          console.log('data ', response);
          if(response.status === 200){
            const token = response.data.jwt;
            localStorage.setItem('authToken', token);
            localStorage.setItem('userName',userName);
            localStorage.setItem('email', email);
            localStorage.setItem('shopdealerid', response.data.user.id);
            setShowAlert(true);
            setStatusMessage('User Added Successfuuly');
            setMessage('Success');
            history.replace('/home');
          }
          }else{
            setShowAlert(true);
            setStatusMessage('Confirm Passoword Not Match , Please Chack Passowrd');
            setMessage('Failed');
            return true;
          }
          
      } catch (error:any) {
          if (error.response) {
            const errorMessage = error.response.data?.error?.message;
            console.log('errorMessage', errorMessage);
            if (error.response.status === 400) {
              console.log('message', errorMessage);
              setShowAlert(true);
              setStatusMessage(errorMessage);
              setMessage('Failed');
            }
          }
      } finally {
        setLoading(false); 
      }
  };

  return (
    <>
      <IonPage id="main-content" className="">
        <Common>
          <IonRow className="ion-text-center ion-padding">
            <IonCol size=""></IonCol>
            <IonCol size="6">
              <IonImg src={Logo} />
            </IonCol>
            <IonCol size=""></IonCol>
          </IonRow>
          <IonList>
            <IonItem lines="none">
              <strong style={{color:"green",fontSize:"1.4em"}}>Register</strong>
            </IonItem>
            <IonItem>Your Name</IonItem>
            <IonItem>
              <IonInput placeholder="Enter Your Name" value={userName} onIonChange={(e) => setUserName(e.detail.value)} fill="outline" />
            </IonItem>
            <IonItem>Email Id</IonItem>
            <IonItem>
              <IonInput placeholder="Enter Your Email Id" value={email} onIonChange={(e) => setEmail(e.detail.value!)} fill="outline" />
            </IonItem>
            <IonItem>Password</IonItem>
            <IonItem>
              <IonInput placeholder="Enter Your Password" type="password" autocomplete="off" autofocus={false} fill="outline" value={password} onIonChange={(e) => setPassword(e.detail.value!)} >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
            <IonItem>Confirm Password</IonItem>
            <IonItem>
              <IonInput placeholder="Confirm Yout Password" type="password" autocomplete="off" autofocus={false} fill="outline" value={confirmPassword} onIonInput={(e) => setConfirmPassword(e.detail.value!)} >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
            <IonItem>Contact Number</IonItem>
            <IonItem>
                <IonInput placeholder="Enter Your Contact Number" value={phoneNumber} onIonChange={(e) => setPhoneNumber(e.detail.value!)} fill="outline" />
            </IonItem>
          </IonList>
          <IonGrid>
            <IonRow className="ion-align-items-center">
              <IonCol size='12'>
              </IonCol>
              <IonCol size="12">
                <IonButton color="success" onClick={handlesign} style={{BackgroundColor:"#4285F4",height:"50px",fontSize:"1.6em",marginTop:"20px"}} expand="block">{loading ? 'Register......' : 'Register'}</IonButton>
              </IonCol>
              <IonCol size="12" className="ion-text-center">
                <span>Or continue with</span>
              </IonCol>
              <IonCol size="12">
                <IonRow>
                  <IonCol size="6">
                    <IonItem style={{border:"2px solid green",borderRadius:"5px"}}>
                      <IonImg slot="start" src={Google} />
                      <span>Google</span>
                    </IonItem>
                  </IonCol>
                  <IonCol size="6">
                    <IonItem style={{border:"2px solid green",borderRadius:"5px"}}>
                      <IonImg slot="start" src={Facebook} />
                      <span>Facebook</span>
                    </IonItem>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="12" class="ion-text-center">
                <span>{"Already have an account"} ? <a href="/login">LOGIN</a></span>
              </IonCol>
            </IonRow>
          </IonGrid>
        </Common>
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={message}
          message={statusMessage}
          buttons={['OK']}
        />
      </IonPage>
    </>
  );
}

//3 Export area
export default SignUP;