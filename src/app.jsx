import React, { useState } from 'react';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import SearchButton from './components/searchbutton/SearchButton';
import { data } from './data';
import './app.scss';

export default function App() {
  const [currSearch, setCurrSearch] = useState(data[0]);

  const updateSearch = (i) => {
    setCurrSearch(data[i]);
  };

  return (
    <div className="app">
      <div className="app__corner -topRight">
        <Settings />
      </div>
      <div className="app__dashboard">
        <SearchBar searchData={currSearch || {}} />
        <div className="app__dashboard__buttons">
          {data.map((dataItem, index) => (
            <SearchButton
              key={index}
              index={index}
              name={dataItem.name}
              path={dataItem.path}
              color={dataItem.color}
              updateSearch={updateSearch} />
          ))}
        </div>
      </div>
    </div>
  );
}
