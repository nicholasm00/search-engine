import React, { useState } from 'react';
import { ModalContainer, AddSearchModal } from '../modal/Modal';
import AddIcon from '@material-ui/icons/Add';
import './SearchButton.scss';

const INITIAL_COLOR = '#ffffff';

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
          <div className="searchButton__icon">
            <AddIcon className="searchButton__favicon" />
          </div>
        </div>
        <span className="searchButton__label">Add Search</span>
        <ModalContainer open={modalOpen} handleClose={handleModalClose}>
          <AddSearchModal
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
