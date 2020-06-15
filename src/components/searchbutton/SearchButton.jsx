import React from "react";
import './SearchButton.scss';
import IconButton from '@material-ui/core/IconButton';
import ClearIcon from '@material-ui/icons/Clear';

export default function SearchButton({ name, updateSearch, id, deleteItem }) {
  const updateSearchFunc = () => {
    updateSearch(id);
  }

  const deleteItemFunc = (e) => {
    e.stopPropagation();
    deleteItem(id);
  }

  return (
    <button className="button" onClick={updateSearchFunc}>
      <div className="button__icon"></div>
      <span className="button__label">{name}</span>
      <IconButton className="button__delete" onClick={deleteItemFunc}>
        <ClearIcon className="button__delete__icon" />
      </IconButton>
    </button>
  );
}