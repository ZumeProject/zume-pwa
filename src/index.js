import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from '@sentry/browser';
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'I18n';
import { Router, View } from 'react-navi';
import * as serviceWorker from './serviceWorker';
import routes from './routes';
import RTL, { DirectionalOuterTheme } from './rtl';
import { Provider } from 'react-redux';
import store, { persistor } from 'Redux/store';
import { PersistGate } from 'redux-persist/es/integration/react';
import lifecycleSlice from 'Redux/lifecycle';
import { loadSessions } from 'Redux/sessions';
import Splash from 'Components/shared/Splash';

Sentry.init({
  dsn: 'https://1b32b862f1ec42b1a86375ad94de8281@sentry.io/1840364'
});

ReactDOM.render(
  <RTL>
    <Provider store={store}>
      <PersistGate loading={<Splash />} persistor={persistor}>
        <DirectionalOuterTheme>
          <CssBaseline />
          <Router routes={routes} basename={process.env.PUBLIC_URL || ''}>
            <Suspense fallback={<Splash />}>
              <View />
            </Suspense>
          </Router>
        </DirectionalOuterTheme>
      </PersistGate>
    </Provider>
  </RTL>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  setWorkbox: wb => {
    store.dispatch(lifecycleSlice.actions.workboxReady(wb));
  },
  onUpdate: () => {
    store.dispatch(lifecycleSlice.actions.appUpdateDetected());
  },
  onExternalUpdate: sw => {
    store.dispatch(lifecycleSlice.actions.externalServiceWorkerDetected(sw));
  }
});

window.addEventListener('beforeinstallprompt', e => {
  // Prevent Chrome 76 and later from showing the mini-infobar
  e.preventDefault();
  store.dispatch(lifecycleSlice.actions.appInstallable(e));
});

window.addEventListener('appinstalled', evt => {
  store.dispatch(lifecycleSlice.actions.appInstalled());
});

if (
  window.navigator.standalone === true ||
  window.matchMedia('(display-mode: standalone)').matches
) {
  store.dispatch(lifecycleSlice.actions.appIsStandalone());
}

store.dispatch(lifecycleSlice.actions.firstVisitChecked());
store.dispatch(loadSessions());
