import React, { useState } from 'react';
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

export default function SearchBar({ searchData }) {
  const [value, setValue] = useState('');
  const [focus, setFocus] = useState(false);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    if (value === '') return;
    const newUrl = searchData.prefix + formatSearch(value) + searchData.suffix;
    window.location.href = newUrl;
  };

  const onFocus = () => {
    setFocus(true);
  };

  const onBlur = () => {
    setFocus(false);
  };

  const getClasses = () => {
    let classes = ['searchbar'];
    if (focus) {
      classes.push('-focus');
    }
    return classes.join(' ');
  };

  return (
    <form className="searchbar" onSubmit={onSearch}>
      <TextField
        className="searchbar__input"
        value={value}
        onChange={onChange}
        label={'Search ' + searchData.name}
        onFocus={onFocus}
        onBlur={onBlur}
        variant="outlined"
        InputProps={{ endAdornment: <SearchIcon onClick={onSearch} /> }}
      />
    </form>
  );
}
