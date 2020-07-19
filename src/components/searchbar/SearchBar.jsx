import React, { useState, useEffect, useRef } from 'react';
import { TextField, InputAdornment, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './SearchBar.scss';

const formatSearch = (text) => {
  return text
    .split('')
    .map((char) => '%' + char.charCodeAt(0).toString(16))
    .join('');
};

const SearchbarIcon = ({ onClick }) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={onClick}>
        <SearchIcon className="searchIcon" />
      </IconButton>
    </InputAdornment>
  );
};

export default function SearchBar({
  searchData,
  focus,
  autocomplete,
  searchHistory,
  updateSearchHistory,
}) {
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (searchData && focus) {
      inputRef.current.focus();
    }
  }, [searchData, focus]);

  const onSearch = (e) => {
    e.preventDefault();
    if (value === '') {
      if (searchData.path === '') {
        return;
      } else {
        window.location.href = searchData.path;
      }
    } else {
      autocomplete && addHistory(value);
      const newUrl = searchData.prefix + formatSearch(value);
      window.location.href = newUrl;
    }
  };

  const removeVal = (val) => {
    let newHistory = [...searchHistory];
    let index = searchHistory.indexOf(val);
    if (index !== -1) {
      newHistory.splice(index, 1);
    }
    return newHistory;
  };

  const addHistory = (val) => {
    let newHistory = removeVal(val);
    newHistory.unshift(val);
    updateSearchHistory(newHistory);
  };

  const deleteHistory = (val) => {
    updateSearchHistory(removeVal(val));
  };

  const onInputChange = (e) => {
    setValue(e.target.value);
    setOpen(true);
  };

  const onClickDelete = (e, val) => {
    e.stopPropagation();
    deleteHistory(val);
  };

  const onAutocompleteChange = (e, val) => {
    setValue(val);
    setOpen(false);
  }

  return (
    <form className="searchbar" onSubmit={onSearch}>
      <Autocomplete
        freeSolo
        options={searchHistory.slice(0, 6)}
        open={autocomplete && open}
        onChange={onAutocompleteChange}
        renderInput={(params) => (
          <TextField
            {...params}
            className="searchbar__input"
            inputRef={inputRef}
            value={value}
            onChange={onInputChange}
            label={searchData.id && 'Search ' + searchData.name}
            variant="outlined"
            onClick={() => setOpen(true)}
            onBlur={() => setOpen(false)}
            InputProps={{
              ...params.InputProps,
              endAdornment: <SearchbarIcon onClick={onSearch} />,
            }}
          />
        )}
        renderOption={(option) => {
          return (
            <div className="searchResult" onClick={() => setOpen(false)}>
              {option}
              <IconButton
                className="searchResult__icon"
                onClick={(e) => onClickDelete(e, option)}
              >
                <ClearIcon />
              </IconButton>
            </div>
          );
        }}
      />
    </form>
  );
}
