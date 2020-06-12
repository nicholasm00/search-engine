import React from 'react';
import './app.scss';
import Settings from './components/settings/Settings';

export default function App() {
  return (
    <div className="app">
      <div className="app__corner -topRight">
        <Settings />
      </div>
    </div>
  );
}
