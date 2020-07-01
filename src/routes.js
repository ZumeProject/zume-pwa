import React from 'react';
import { mount, route, compose, withView } from 'navi';
import { View } from 'react-navi';
import ZumeViewWithNav from 'Components/zume/ZumeViewWithNav';
import App from 'Pages/App';
import Menu from 'Pages/Menu';
import Language from 'Pages/Language';
import Sessions from 'Pages/Sessions';
import LiveSession from 'Pages/LiveSession';
import Downloads from 'Pages/Downloads';
import About from 'Pages/About';

/**
 * Tentative route structure:
 * /home
 * /menu
 * /session/:session_id
 * /group/:group_id
 * /gathering/:gathering_id
 * /downloads
 *
 */

const nonNavViews = ['/live'];
const toMount = {
  '/': route({
    title: 'Home',
    view: <App />
  }),
  '/menu': route({
    title: 'Menu',
    view: <Menu />
  }),
  '/language': route({
    title: 'Language',
    view: <Language />
  }),
  '/session/:id': route(async req => {
    let id = req.params.id;
    return { title: 'Sessions', view: <Sessions selectedId={id} /> };
  }),
  '/downloads': route({
    title: 'Downloads',
    view: <Downloads />
  }),
  '/live/:id': route(async req => {
    let id = req.params.id;
    return { title: 'Live session', view: <LiveSession selectedId={id} /> };
  }),
  '/live/:id/:index': route(async req => {
    let id = req.params.id;
    let index;
    if (!isNaN(req.params.index)) {
      index = parseInt(req.params.index);
    }
    return {
      title: 'Live session',
      view: <LiveSession selectedId={id} selectedIndex={index} />
    };
  }),
  '/about': route({
    title: 'About',
    view: <About />
  })
};

const routes = mount(toMount);
export default compose(
  withView(request => {
    if (
      nonNavViews.some(v => {
        return request.path.startsWith(v);
      })
    ) {
      return <View />;
    } else {
      return (
        <ZumeViewWithNav>
          <View />
        </ZumeViewWithNav>
      );
    }
  }),
  routes
);
