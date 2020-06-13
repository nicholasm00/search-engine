import React from 'react';
import './app.scss';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import Button from './components/button/Button';

export default function App() {
  return (
    <div className="app">
      <div className="app__corner -topRight">
        <Settings />
      </div>
      <div className="app__dashboard">
        <SearchBar />
        <div className="app__dashboard__buttons">
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
          <Button></Button>
        </div>
      </div>
    </div>
  );
}
