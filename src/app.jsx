import React, { useState } from 'react';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import SearchButton from './components/searchbutton/SearchButton';
import SearchButtonAdd from './components/searchbutton/SearchButtonAdd';
import {
  searchItems,
  defaultId,
  setDefaultId,
  dashboard,
  setDashboard,
  deepCopy,
} from './storage';
import './app.scss';

const MAX_DASHBOARD_LENGTH = 10;

export default function App() {
  const [currSearch, setCurrSearch] = useState(
    dashboard.find((item) => item.id === defaultId)
  );
  const [dragStartIndex, setDragStartIndex] = useState(-1);
  const [dragOverIndex, setDragOverIndex] = useState(-1);

  const updateSearch = (id) => {
    const found = dashboard.find((item) => item.id === id);
    setCurrSearch(found);
  };

  const deleteItem = (id) => {
    let newDash = dashboard.filter((item) => item.id !== id);
    setDashboard(newDash);
  };

  const addItem = (item) => {
    let newDash = dashboard.concat(item);
    setDashboard(newDash);
  };

  const editItem = (id, name, isDefault) => {
    if (isDefault) {
      setDefaultId(id);
    }
    let newDash = dashboard.map((item) => {
      let newItem = item;
      if (item.id === id) {
        newItem.name = name;
      }
      return newItem;
    });
    setDashboard(newDash);
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
      setDashboard(newDash);
    }
    setDragStartIndex(-1);
    setDragOverIndex(-1);
  };

  return (
    <div className="app">
      <div className="app__corner -topRight">
        <Settings />
      </div>
      <div className="app__dashboard">
        <SearchBar searchData={currSearch || {}} />
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
            <SearchButtonAdd addItem={addItem} data={searchItems} />
          )}
        </div>
      </div>
    </div>
  );
}
