/* @refresh reload */
import { lazy } from 'solid-js';
import { render } from 'solid-js/web';
import { Route, Router } from '@solidjs/router';

import './global.css';
import App from './App';

// Routes
const Home = lazy(() => import(`./pages/index/Home` /* @vite-ignore */));

render(() => (
  <Router root={App}>
    <Route path="/" component={Home} />
    <Route path="*404" component={Home} />
  </Router>
), document.body);