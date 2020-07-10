/* global chrome */

import React, { useState, useEffect } from 'react';
import Settings from './components/settings/Settings';
import SearchBar from './components/searchbar/SearchBar';
import SearchButton from './components/searchbutton/SearchButton';
import SearchButtonAdd from './components/searchbutton/SearchButtonAdd';
//import { DeleteSearchAlert } from './components/modal/Modal';
import {Snackbar, Slide, Fade, Button} from '@material-ui/core';
import { data, initDashboard } from './data';
import './app.scss';

const dashboardLogoLight = require('./assets/dashboard_logo_light.svg');
const dashboardLogoDark = require('./assets/dashboard_logo_dark.svg');

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

const sortArr = (arr) => {
  let sorted = deepCopy(arr);
  sorted.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase() ? 1 : -1));
  return sorted;
};

const MAX_DASHBOARD_LENGTH = 10;

export default function App() {
  const [dashboard, setDashboard] = useState(null);
  const [defaultId, setDefaultId] = useState(null);
  const [darkMode, setDarkMode] = useState(null);
  const [currSearch, setCurrSearch] = useState({});
  const [focus, setFocus] = useState(true);
  const [loading, setLoading] = useState(true);
  const [dragStartIndex, setDragStartIndex] = useState(-1);
  const [dragOverIndex, setDragOverIndex] = useState(-1);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    // chrome.storage.sync.get(null, (res) => {
    //   let val = res['chrome-storage-dashboard'];
    //   updateDashboard(val === undefined ? deepCopy(initDashboard) : val);
    //   val = res['chrome-storage-default-id'];
    //   let defId = val === undefined ? data[0].id : val;
    //   updateDefaultId(defId);
    //   setCurrSearch(data.find((item) => item.id === defId));
    //   val = res['chrome-storage-dark-mode'];
    //   updateDarkMode(val === undefined ? false : val);
    //   setLoading(false);
    // });
    setDashboard(deepCopy(initDashboard));
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

  const resetDashboard = () => {
    updateDashboard(deepCopy(initDashboard));
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

  const triggerAlert = (val) => {
    setAlertOpen(val);
  }

  function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
  }
  
  const DeleteSearchAlert = () => {
  
    const [state, setState] = React.useState({
      open: false,
      Transition: Fade,
    });
  
    const handleClick = (Transition) => () => {
      setState({
        open: true,
        Transition,
      });
    };
  
    const handleClose = () => {
      setState({
        ...state,
        open: false,
      });
    };
    return (
      <div style={{display: alertOpen? "block": "none"}} className="app__deleteAlert">
        <Button onClick={handleClick(SlideTransition)}>delete alert</Button>
        <Snackbar
          open={state.open}
          autoHideDuration={6000}
          onClose={handleClose}
          TransitionComponent={state.Transition}
          message="Search deleted"
          key={state.Transition.name}
          action={
            <React.Fragment>
              <Button color="secondary" size="small" onClick={handleClose}>
                Undo
              </Button>
              {/* <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton> */}
            </React.Fragment>
          }
        />
      </div>
    );
  }

  return (
    !loading && (
      <div className="app">
        <div className="app__dashboard">
          <img
            className="app__dashboard__logo"
            src={darkMode ? dashboardLogoDark : dashboardLogoLight}
          />
          <SearchBar searchData={currSearch} focus={focus} />
          <div className="app__dashboard__buttons">
            {dashboard.map((item, index) => (
              <SearchButton
                key={item.id}
                id={item.id}
                name={item.name}
                color={item.color}
                favicon={item.favicon}
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
                triggerAlert={triggerAlert}
                setFocus={setFocus}
              />
            ))}
            {dashboard.length < MAX_DASHBOARD_LENGTH && (
              <SearchButtonAdd addItem={addItem} data={sortArr(data)} />
            )}
          </div>
        </div>
        <div className="app__corner -topRight">
          <Settings
            darkMode={darkMode}
            updateDarkMode={updateDarkMode}
            resetDashboard={resetDashboard}
          />
        </div>
        <DeleteSearchAlert />
      </div>
    )
  );
}
