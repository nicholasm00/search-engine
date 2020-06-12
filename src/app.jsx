import React from 'react';
import './app.scss';
import SearchBar from "./components/searchbar/SearchBar";

export default function App() {
  return (
    <div className="app">
      <div className="app__dashboard">
        <SearchBar />
      </div>
    </div>
  )
}

