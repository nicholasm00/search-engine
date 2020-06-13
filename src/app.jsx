import React, { useState } from 'react';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import Button from './components/button/Button';
import { data } from './data';
import './app.scss';

export default function App() {
  const [currSearch, setCurrSearch] = useState(data[0]);

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
        <SearchBar searchData={currSearch} />
      </div>
    </div>
  );
}
