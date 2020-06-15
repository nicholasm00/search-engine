import React, { useState, useEffect } from 'react';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import SearchButton from './components/searchbutton/SearchButton';
import { data } from './data';
import './app.scss';

export default function App() {
  const [currSearch, setCurrSearch] = useState(data[0]);
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    setDashboard(data);
  }, []);

  const updateSearch = (id) => {
    const found = data.find(item => item.id === id);
    setCurrSearch(found);
  };

  const deleteItem = (id) => {
    setDashboard(prev => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="app">
      <div className="app__corner -topRight">
        <Settings />
      </div>
      <div className="app__dashboard">
        <SearchBar searchData={currSearch || {}} />
        <div className="app__dashboard__buttons">
          {dashboard.map((dataItem) => (
            <SearchButton
              key={dataItem.id}
              id={dataItem.id}
              name={dataItem.name}
              path={dataItem.path}
              color={dataItem.color}
              updateSearch={updateSearch}
              deleteItem={deleteItem} />
          ))}
        </div>
      </div>
    </div>
  );
}
