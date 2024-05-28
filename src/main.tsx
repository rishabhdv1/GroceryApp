/* import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import "../src/style/global.css"

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); */

import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { SplashScreen } from '@capacitor/splash-screen';
import "../src/style/global.css";

const container = document.getElementById('root');
const root = createRoot(container!);

const RootComponent = () => {
  useEffect(() => {
    // Hide the splash screen once the app has rendered
    SplashScreen.hide();
  }, []);

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

root.render(<RootComponent />);
