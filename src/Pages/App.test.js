import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import store from 'Redux/store';
import 'I18n';
import { Router } from 'react-navi';
import routes from '../routes';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <Router routes={routes}>
        <Suspense fallback={null}>
          <App />
        </Suspense>
      </Router>
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
