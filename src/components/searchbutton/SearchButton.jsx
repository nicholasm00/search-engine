import React from "react";
import './SearchButton.scss';

export default function SearchButton({ name, updateSearch, index }) {
  const updateSearchFunc = () => {
    updateSearch(index);
  }
  return (
    <button className="button" onClick={updateSearchFunc}>
      <div className="button__icon"></div>
      <span className="button__label">{name}</span>
    </button>
  );
}