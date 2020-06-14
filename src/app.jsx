import React, { useState } from 'react';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import SearchButton from './components/searchbutton/SearchButton';
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
        <SearchBar searchData={currSearch || {}} />
        <div className="app__dashboard__buttons">
          <SearchButton></SearchButton>
          <SearchButton></SearchButton>
          <SearchButton></SearchButton>
          <SearchButton></SearchButton>
          <SearchButton></SearchButton>
          <SearchButton></SearchButton>
        </div>
      </div>
    </div>
  );
}
