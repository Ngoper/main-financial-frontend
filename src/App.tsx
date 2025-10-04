import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Dashboard from './pages/Dashboard';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Chat from './pages/chat/Chat';
import { AIChat } from './pages/ai-chat/AIChat';
import { LanguageProvider } from './components/localization/LanguageProvider';
import { ThemeProvider } from './components/theme/ThemeProvider';
import './App.css';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/spacing-utilities.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <ThemeProvider defaultTheme="system" enableTransitions={true}>
      <LanguageProvider defaultLanguage="id">
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/dashboard">
              <AIChat />
            </Route>
            <Route exact path="/auth/login">
              <Login />
            </Route>
            <Route exact path="/auth/register">
              <Register />
            </Route>
            {/* Unified Chat Interface - Direct Access */}
            <Route exact path="/chat">
              <Chat />
            </Route>
            {/* Simplified Routing - All chat topics go to unified interface */}
            <Route exact path="/chat/:mode">
              <Chat />
            </Route>
            {/* Company Profile Routes */}
            <Route exact path="/perusahaan/:kode">
              <Dashboard />
            </Route>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </LanguageProvider>
    </ThemeProvider>
  </IonApp>
);

export default App;
