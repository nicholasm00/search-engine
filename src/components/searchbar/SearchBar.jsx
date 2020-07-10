import React, { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import './SearchBar.scss';

const formatSearch = (text) => {
  return text
    .split('')
    .map((char) => '%' + char.charCodeAt(0).toString(16))
    .join('');
};

const SearchIcon = ({ onClick }) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onClick}>
        <Search className="searchIcon" />
      </IconButton>
    </InputAdornment>
  );
};

export default function SearchBar({ searchData, focus }) {
  const [value, setValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchData && focus) {
      inputRef.current.focus();
    }
  }, [searchData, focus]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    if (value === '') {
      if (searchData.path === '') {
        return;
      } else {
        window.location.href = searchData.path;
      }
    }
    const newUrl = searchData.prefix + formatSearch(value);
    window.location.href = newUrl;
  };

  return (
    <form className="searchbar" onSubmit={onSearch}>
      <TextField
        className="searchbar__input"
        inputRef={inputRef}
        value={value}
        onChange={onChange}
        label={searchData.id && 'Search ' + searchData.name}
        variant="outlined"
        InputProps={{ endAdornment: <SearchIcon onClick={onSearch} /> }}
      />
    </form>
  );
}
