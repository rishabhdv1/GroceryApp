
//1. Import area
import React, { useState } from 'react';
import { IonPage, IonInput, IonButton, IonGrid, IonRow, IonCol, IonAlert, IonIcon, } from '@ionic/react';
import axios from 'axios';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { eye, eyeOff } from 'ionicons/icons';
import Common from '../components/Common';
import { URL } from '../helpers/url';
import Header from '../components/Header';


//2. Defination area
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
  const [password, setPassword] = useState<any>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //2.3 Return statement
  return (
    <>
      <IonPage id="main-content" className="">
        <Header title="SIGN UP" />
        <Common>
          <IonGrid className="vCenter">
            <IonRow>
              <IonCol size="12" className="ion-no-padding">
                <IonRow className="ion-align-items-center">
                  <IonCol size='12'>
                    <IonInput label="Full Name" value={userName} onIonChange={(e) => setUserName(e.detail.value)} labelPlacement="stacked" fill="outline" />
                  </IonCol>
                  <IonCol size='12'>
                    <IonInput label="Email"  value={email} onIonChange={(e) => setEmail(e.detail.value!)} labelPlacement="stacked" fill="outline" />
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="12" className="ion-no-padding">
                <IonRow className="ion-align-items-center">
                  <IonCol size="12" className="ion-no-padding">
                    <IonRow className="ion-align-items-center">
                      <IonCol size="12">
                        <IonInput
                          label="Password"
                          autocomplete="off"
                          autofocus={false}
                          labelPlacement="floating"
                          fill="outline"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onIonChange={(e) => setPassword(e.detail.value!)}
                        >
                          <IonIcon
                            size="small"
                            color="primary"
                            slot="end"
                            onClick={togglePasswordVisibility}
                            icon={showPassword ? eyeOff : eye}
                          />
                        </IonInput>
                      </IonCol>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonCol>
              <IonCol size="12" className="ion-no-padding">
                <IonRow className="ion-align-items-center">
                  <IonCol size="12" className="ion-no-padding">
                    <IonRow className="ion-align-items-center">
                      <IonCol size="12">
                            
                        <IonInput
                          label="Confirm Password"
                          autocomplete="off"
                          autofocus={false}
                          labelPlacement="floating"
                          fill="outline"
                          type={showPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onIonInput={(e) => setConfirmPassword(e.detail.value!)}
                        >
                          <IonIcon
                            size="small"
                            color="primary"
                            slot="end"
                            onClick={togglePasswordVisibility}
                            icon={showPassword ? eyeOff : eye}
                          />
                        </IonInput>
                      </IonCol>
                    </IonRow>
                  </IonCol>
                </IonRow>
              </IonCol>
            </IonRow>
            <IonButton onClick={handlesign} style={{BackgroundColor:"#4285F4",height:"50px",fontSize:"1.6em",marginTop:"20px"}} expand="block">{loading ? 'Sign Up......' : 'Sign Up'}</IonButton>
            <div className="ion-text-center ion-padding">OR</div>
            <IonRow class="ion-text-center">
              <IonCol>
                <span>{"Already a User"} ? <a href="/login">LOGIN</a></span>
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