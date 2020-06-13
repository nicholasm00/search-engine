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

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    if (value === '') return;
    const newUrl = searchData.prefix + formatSearch(value) + searchData.suffix;
    window.location.href = newUrl;
  };

  return (
    <form onSubmit={onSearch}>
      <TextField
        className="searchBar"
        value={value}
        onChange={onChange}
        label={'Search ' + searchData.name}
        variant="outlined"
        color="primary"
        InputProps={{
          endAdornment: <SearchIcon onClick={onSearch} />,
        }}
      />
    </form>
  );
}
