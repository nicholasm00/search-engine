import React, { useState } from 'react';
import { ModalContainer, ColorPicker, DefaultBox } from './SearchButton';
import { Card, Button, TextField } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './SearchButton.scss';

const INITIAL_COLOR = '#ffffff';

const ModalCard = ({
  addItem,
  handleClose,
  onChangeSite,
  data,
  isDefault,
  onChangeDefault,
  color,
  onChangeColor,
}) => {
  return (
    <Card className="modalCard">
      <div>Add Search</div>
      <div className="modalCard__row">
        <Autocomplete
          onChange={onChangeSite}
          className="modalCard__input"
          options={data}
          getOptionLabel={(item) => item.name}
          renderInput={(params) => (
            <TextField {...params} label="Site" variant="outlined" />
          )}
        />
        <ColorPicker color={color} onChangeColor={onChangeColor} />
      </div>
      <DefaultBox onChangeDefault={onChangeDefault} isDefault={isDefault} />
      <div className="modalCard__row">
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={addItem}
          variant="contained"
          className="modalCard__button -primary"
        >
          Add
        </Button>
      </div>
    </Card>
  );
};

const randId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export default function SearchButtonAdd({ addItem, data }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [site, setSite] = useState(null);
  const [newDefault, setNewDefault] = useState(false);
  const [newColor, setNewColor] = useState(INITIAL_COLOR);

  const onChangeDefault = (e, v) => {
    setNewDefault(e.target.checked);
  };

  const onChangeColor = (col) => {
    setNewColor(col);
  };

  const addItemFunc = (e) => {
    if (site === null || !modalOpen) return;
    let newItem = { ...site };
    newItem.id = randId();
    newItem.color = newColor;
    addItem(newItem, newDefault);
    handleModalClose(e);
  };

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleModalClose = (e) => {
    e.stopPropagation();
    setModalOpen(false);
    setSite(null);
    setNewDefault(false);
    setNewColor(INITIAL_COLOR);
  };

  const onChangeSite = (e, value) => {
    setSite(value);
    if (!value) {
      setNewColor(INITIAL_COLOR);
    } else {
      setNewColor(value.color);
    }
  };

  return (
    <button className="searchButton" onClick={handleModalOpen}>
      <div className="searchButton__container">
        <div className="searchButton__iconContainer">
          <AddIcon className="searchButton__iconContainer__icon" />
        </div>
        <span className="searchButton__label">Add Search</span>
        <ModalContainer open={modalOpen} handleClose={handleModalClose}>
          <ModalCard
            addItem={addItemFunc}
            onChangeSite={onChangeSite}
            handleClose={handleModalClose}
            data={data}
            isDefault={newDefault}
            onChangeDefault={onChangeDefault}
            color={newColor}
            onChangeColor={onChangeColor}
          />
        </ModalContainer>
      </div>
    </button>
  );
}
