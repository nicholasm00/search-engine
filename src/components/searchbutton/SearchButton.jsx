import React from "react";
import './SearchButton.scss';

export default function Button() {
  return (
    <button className="button">
      <div className="button__icon"></div>
      <span className="button__label">yea</span>
    </button>
  );
}