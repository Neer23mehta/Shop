import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { persistor, store } from './Ecommerse/Store/StoreR';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-5kpc2gfunxrmstyt.us.auth0.com"
    clientId="21nhxlM9eovd5mSfQJZU34YwaBPRh3Mm"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
        <ToastContainer/>
      </PersistGate>
    </Provider>
  </Auth0Provider>,


);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
