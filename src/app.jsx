import React, { useState } from 'react';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import SearchButton from './components/searchbutton/SearchButton';
import SearchButtonAdd from './components/searchbutton/SearchButtonAdd';
import { data } from './data';
import './app.scss';

const MAX_DASHBOARD_LENGTH = 10;

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

export default function App() {
  const [currSearch, setCurrSearch] = useState(data[0]);
  const [dashboard, setDashboard] = useState(deepCopy(data));
  const [defaultId, setDefaultId] = useState(0);
  const [dragStartIndex, setDragStartIndex] = useState(-1);
  const [dragOverIndex, setDragOverIndex] = useState(-1);

  const updateSearch = (id) => {
    const found = dashboard.find((item) => item.id === id);
    setCurrSearch(found);
  };

  const deleteItem = (id) => {
    setDashboard((prev) => prev.filter((item) => item.id !== id));
  };

  const addItem = (item) => {
    setDashboard((prev) => prev.concat(item));
  };

  const editItem = (id, name, isDefault) => {
    if (isDefault) {
      setDefaultId(id);
    }
    setDashboard((prev) =>
      prev.map((item) => {
        let newItem = item;
        if (item.id === id) {
          newItem.name = name;
        }
        return newItem;
      })
    );
  };

  const onDragStart = (index) => {
    setDragStartIndex(index);
  };

  const onDragOver = (index) => {
    setDragOverIndex(index);
  };

  const onDragEnd = () => {
    if (dragStartIndex !== dragOverIndex && dragOverIndex !== -1) {
      setDashboard((prev) => {
        let [removed] = prev.splice(dragStartIndex, 1);
        prev.splice(dragOverIndex, 0, removed);
        return prev;
      });
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
            <SearchButtonAdd addItem={addItem} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
