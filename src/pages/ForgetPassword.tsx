import React, { useState } from 'react';
import { IonPage, IonInput, IonButton, IonContent, IonRow, IonCol } from '@ionic/react';
import axios from 'axios';
import Common from '../components/Common';
import Header from '../components/Header';

const ForgetPassword = () => {
  const [step, setStep] = useState(1); // Control the flow steps
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');

  const requestOtp = async () => {
    await axios.post('/api/email', { email });
    setStep(2);
  };

  const verifyOtp = async () => {
    const response = await axios.post('/api/email/verify', { email, otp });
    if (response.data.message === "OTP verified.") {
      setStep(3);
    } else {
      alert("Invalid OTP or expired.");
    }
  };

  const resetPassword = async () => {
    // Reset password
    await axios.post('/api/auth/reset-password', { email, password });
    alert("Password reset successfully.");
  };

  return (
    <IonPage>
        <Header title="Forget Password" />
      <Common>
        <IonRow>
            <IonCol size="12">
                {step === 1 && (
                    <>
                        <IonInput fill="outline" placeholder="Enter your email" onIonChange={e => setEmail(e.target.value)} />
                        <IonButton expand="block" onClick={requestOtp}>Send OTP</IonButton>
                    </>
                )}
            </IonCol>
            <IonCol size="12">
                {step === 2 && (
                    <>
                        <IonInput fill="outline" placeholder="Enter OTP" onIonChange={e => setOtp(e.target.value)} />
                        <IonButton expand="block" onClick={verifyOtp}>Verify OTP</IonButton>
                    </>
                )}
            </IonCol>
            <IonCol size="12">
                {step === 3 && (
                    <>
                        <IonInput fill="outline" placeholder="New Password" onIonChange={e => setPassword(e.target.value)} />
                        <IonInput fill="outline" placeholder="Confirm Password" onIonChange={e => setPassword(e.target.value)} />
                        <IonButton expand="block" onClick={resetPassword}>Reset Password</IonButton>
                    </>
                )}
            </IonCol>
        </IonRow>
      </Common>
    </IonPage>
  );
};

export default ForgetPassword;
