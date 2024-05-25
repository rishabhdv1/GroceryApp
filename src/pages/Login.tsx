import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonButton, IonCol, IonImg, IonInput, IonInputPasswordToggle, IonItem, IonList, IonPage, IonRow } from '@ionic/react';
import { URL } from '../helpers/url';
import axios from 'axios';
import Common from '../components/Common';
import Logo from '../assets/svg/LoginPage/SGLogo.svg'
import IllustImage from '../assets/svg/LoginPage/Illustrator.svg'
import Google from '../assets/svg/LoginPage/google.svg'
import Facebook from '../assets/svg/LoginPage/fb.svg'

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
        <Common>
          <IonRow className="ion-text-center ion-padding">
            <IonCol size=""></IonCol>
            <IonCol size="6">
              <IonImg src={Logo} />
            </IonCol>
            <IonCol size=""></IonCol>
          </IonRow>
          <IonRow className="ion-text-center ion-padding">
            <IonCol size=""></IonCol>
            <IonCol size="4">
              <IonImg src={IllustImage} />
            </IonCol>
            <IonCol size=""></IonCol>
          </IonRow>
          <IonList>
          <IonItem lines="none">
            <strong style={{color:"green",fontSize:"1.4em"}}>Login</strong>
          </IonItem>
            <IonItem>Email Id</IonItem>
            <IonItem>
              <IonInput fill="outline" value={email} onIonInput={(e) => setEmail(e.detail.value!)} type="email" placeholder="Enter Your Email Id" />
            </IonItem>
            <IonItem>Password</IonItem>
            <IonItem>
              <IonInput fill="outline" value={password} onIonInput={(e) => setPassword(e.detail.value!)} type="password" placeholder="Enter your password" >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
            </IonItem>
          </IonList>
          <IonList>
            <IonRow>
              {/* <IonCol size="12" className="ion-text-end">
                <a href="/forget-password">Forget Password?</a>
              </IonCol> */}
              <IonCol size="12">
                <IonButton color="success" expand="block" onClick={onLogin}>
                  <span style={{fontSize:"2em"}}>Log In</span>
                </IonButton>
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
              <IonCol size="12" className="ion-text-center">
                <span>Don't have an account?<a href="/signup">Register</a></span>
              </IonCol>
            </IonRow>
          </IonList>
        </Common>
      </IonPage>
  );
};

export default Login;
