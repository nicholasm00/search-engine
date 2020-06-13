import React, { useState, useEffect } from "react";
import './Button.scss';

export default function Button() {
  return (
    <button className="button">
      <div className="button__icon"></div>
      <span className="button__label">yea</span>
    </button>
  );
}