/* global chrome */

import React, { useState, useEffect } from 'react';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import SearchButton from './components/searchbutton/SearchButton';
import SearchButtonAdd from './components/searchbutton/SearchButtonAdd';
import { data } from './data';
import './app.scss';

const deepCopy = (input) => {
  if (typeof input !== 'object' || input === null) {
    return input;
  }
  let output = Array.isArray(input) ? [] : {};
  for (let key in input) {
    let value = input[key];
    output[key] = deepCopy(value);
  }
  return output;
};

const MAX_DASHBOARD_LENGTH = 10;

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [defaultId, setDefaultId] = useState(null);
  const [darkMode, setDarkMode] = useState(null);
  const [currSearch, setCurrSearch] = useState({});
  const [loading, setLoading] = useState(true);
  const [dragStartIndex, setDragStartIndex] = useState(-1);
  const [dragOverIndex, setDragOverIndex] = useState(-1);

  useEffect(() => {
    // chrome.storage.sync.get(null, (res) => {
    //   let val = res['chrome-storage-dashboard'];
    //   updateDashboard(val === undefined ? deepCopy(data) : val);
    //   val = res['chrome-storage-default-id'];
    //   let defId = val === undefined ? data[0].id : val;
    //   updateDefaultId(defId);
    //   setCurrSearch(data.find((item) => item.id === defId));
    //   val = res['chrome-storage-dark-mode'];
    //   updateDarkMode(val === undefined ? false : val);
    //   setLoading(false);
    // });
    setDashboard(deepCopy(data));
    setDefaultId(data[0].id);
    setDarkMode(false);
    setCurrSearch(data[0]);
    setLoading(false);
  }, []);

  const rootElement = document.documentElement;

  useEffect(() => {
    if (darkMode) {
      rootElement.classList.add('-dark');
    } else {
      rootElement.classList.remove('-dark');
    }
  }, [darkMode]);

  const updateDashboard = (val) => {
    setDashboard(val);
    //chrome.storage.sync.set({ 'chrome-storage-dashboard': val });
  };

  const updateDefaultId = (val) => {
    setDefaultId(val);
    //chrome.storage.sync.set({ 'chrome-storage-default-id': val });
  };

  const updateDarkMode = (val) => {
    setDarkMode(val);
    //chrome.storage.sync.set({ 'chrome-storage-dark-mode': val });
  };

  const updateSearch = (id) => {
    const found = dashboard.find((item) => item.id === id);
    setCurrSearch(found);
  };

  const deleteItem = (id) => {
    let newDash = dashboard.filter((item) => item.id !== id);
    updateDashboard(newDash);
    if (id === currSearch.id) {
      setCurrSearch({});
    }
  };

  const addItem = (item, isDefault) => {
    if (isDefault) {
      updateDefaultId(item.id);
    }
    let newDash = dashboard.concat(item);
    updateDashboard(newDash);
  };

  const editItem = (id, name, isDefault, color) => {
    if (isDefault) {
      updateDefaultId(id);
    }
    let newDash = dashboard.map((item) => {
      let newItem = item;
      if (item.id === id) {
        newItem.name = name;
        newItem.color = color;
      }
      return newItem;
    });
    updateDashboard(newDash);
  };

  const onDragStart = (index) => {
    setDragStartIndex(index);
  };

  const onDragOver = (index) => {
    setDragOverIndex(index);
  };

  const onDragEnd = () => {
    if (dragStartIndex !== dragOverIndex && dragOverIndex !== -1) {
      let newDash = deepCopy(dashboard);
      let [removed] = newDash.splice(dragStartIndex, 1);
      newDash.splice(dragOverIndex, 0, removed);
      updateDashboard(newDash);
    }
    setDragStartIndex(-1);
    setDragOverIndex(-1);
  };

  return (
    !loading && (
      <div className="app">
        <div className="app__corner -topRight">
          <Settings darkMode={darkMode} updateDarkMode={updateDarkMode} />
        </div>
        <div className="app__dashboard">
          <SearchBar searchData={currSearch} />
          <div className="app__dashboard__buttons">
            {dashboard.map((item, index) => (
              <SearchButton
                key={item.id}
                id={item.id}
                name={item.name}
                path={item.path}
                color={item.color}
                updateSearch={updateSearch}
                deleteItem={deleteItem}
                editItem={editItem}
                currSearchId={currSearch.id}
                isDefault={defaultId === item.id}
                index={index}
                dragStartIndex={dragStartIndex}
                dragOverIndex={dragOverIndex}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
              />
            ))}
            {dashboard.length < MAX_DASHBOARD_LENGTH && (
              <SearchButtonAdd addItem={addItem} data={data} />
            )}
          </div>
        </div>
      </div>
    )
  );
}
