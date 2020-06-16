import React, { useState } from 'react';
import { ModalContainer } from './SearchButton';
import {
  Card,
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import './SearchButton.scss';

const ModalCard = ({ addItem, handleClose, onChangeSite, data }) => {
  return (
    <Card className="modalCard">
      <div>Add Search</div>
      <FormControl variant="filled">
        <InputLabel>Site</InputLabel>
        <Select onChange={onChangeSite} className="modalCard__input">
          {data.map((item, index) => (
            <MenuItem key={index} value={index}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel label="Make Default" control={<Checkbox />} />
      <div>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={addItem} variant="contained">
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
  const [siteIndex, setSiteIndex] = useState(-1);

  const addItemFunc = (e) => {
    if (siteIndex === -1 || !modalOpen) return;
    let newItem = { ...data[siteIndex] };
    newItem.id = randId();
    addItem(newItem);
    handleModalClose(e);
  };

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleModalClose = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const onChangeSite = (e) => {
    setSiteIndex(e.target.value);
  };

  return (
    <button className="searchButton" onClick={handleModalOpen}>
      <div className="searchButton__icon">
        <AddIcon className="searchButton__icon__add" />
      </div>
      <span className="searchButton__label">Add Search</span>
      <ModalContainer open={modalOpen} handleClose={handleModalClose}>
        <ModalCard
          addItem={addItemFunc}
          onChangeSite={onChangeSite}
          handleClose={handleModalClose}
          data={data}
        />
      </ModalContainer>
    </button>
  );
}
