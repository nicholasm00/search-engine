import React from 'react';
import './app.scss';
import SearchBar from "./components/searchbar/SearchBar";

export default function App() {
  return (
    <div className="app">
      <div className="main">
        <div className="searchBarContainer">
          <SearchBar />
        </div>
      </div>
    </div>
  )
}

