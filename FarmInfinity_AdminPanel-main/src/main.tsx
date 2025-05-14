import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
// import keycloak from './keycloak';

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <ReactKeycloakProvider
//     authClient={keycloak}
//     initOptions={{
//       onLoad: 'login-required',
//       checkLoginIframe: false,
//     }}
//   >
//     <App />
//   </ReactKeycloakProvider>
// );

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);