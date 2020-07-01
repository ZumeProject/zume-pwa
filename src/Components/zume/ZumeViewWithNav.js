import React from 'react';
import ZumeAppNavigation from './ZumeAppNavigation';
import { NotFoundBoundary } from 'react-navi';

function renderNotFound() {
  return (
    <div className="Layout-error">
      <h1>404 - Not Found</h1>
    </div>
  );
}

function ZumeViewWithNav({ children }) {
  return (
    <div>
      <NotFoundBoundary render={renderNotFound}>{children}</NotFoundBoundary>
      <ZumeAppNavigation />
    </div>
  );
}

export default ZumeViewWithNav;
