import React, { useState, useEffect } from "react";
import './SearchBar.scss';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

export default function ColorTextFields() {
  return (
    <form autoComplete="off">
      <TextField className="searchBar"
        id="outlined-secondary"
        label="Search..."
        variant="outlined"
        color="primary"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon className="searchBar__icon" />
            </InputAdornment>
          ),
        }}
      />
    </form>
  );
}
