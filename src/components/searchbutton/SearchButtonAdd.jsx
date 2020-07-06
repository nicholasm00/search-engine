import React, { useState } from 'react';
import {
  ModalContainer,
  AddSearchModal,
  CustomSearchModal,
} from '../modal/Modal';
import AddIcon from '@material-ui/icons/Add';
import './SearchButton.scss';

const INITIAL_COLOR = '#0693e3';

const randId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export default function SearchButtonAdd({ addItem, data }) {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [customModalOpen, setCustomModalOpen] = useState(false);
  const [site, setSite] = useState(null);
  const [newDefault, setNewDefault] = useState(false);
  const [newColor, setNewColor] = useState(INITIAL_COLOR);
  const [name, setName] = useState('');
  const [prefix, setPrefix] = useState('');
  const [home, setHome] = useState('');
  const [favicon, setFavicon] = useState('');

  const onChangeDefault = (e, v) => {
    setNewDefault(e.target.checked);
  };

  const onChangeColor = (col) => {
    setNewColor(col);
  };

  const addItemFunc = (e) => {
    if (site === null || !addModalOpen) return;
    let newItem = { ...site };
    newItem.id = randId();
    newItem.color = newColor;
    addItem(newItem, newDefault);
    handleAddModalClose(e);
  };

  const addCustomFunc = (e) => {
    if (name === null || prefix === null || !customModalOpen) return;
    let newItem = {
      id: randId(),
      name: name,
      prefix: prefix,
      path: home,
      favicon: favicon,
      color: newColor,
    };
    addItem(newItem, newDefault);
    handleCustomModalClose(e);
  };

  const handleAddModalOpen = (e) => {
    if (customModalOpen) return;
    e.stopPropagation();
    setAddModalOpen(true);
  };

  const handleCustomModalClose = (e) => {
    e.stopPropagation();
    clearFields();
  };

  const handleAddModalClose = (e) => {
    e.stopPropagation();
    clearFields();
  };

  const clearFields = () => {
    setCustomModalOpen(false);
    setAddModalOpen(false);
    setSite(null);
    setNewDefault(false);
    setNewColor(INITIAL_COLOR);
    setName('');
    setPrefix('');
    setHome('');
    setFavicon('');
  };

  const onChangeSite = (e, value) => {
    setSite(value);
    if (!value) {
      setNewColor(INITIAL_COLOR);
    } else {
      setNewColor(value.color);
    }
  };

  const onCreateCustom = (e) => {
    setAddModalOpen(false);
    setSite(null);
    setCustomModalOpen(true);
  };

  const onChangeName = (e) => {
    setName(e.target.value);
  };

  const onChangePrefix = (e) => {
    setPrefix(e.target.value);
  };

  const onChangeHome = (e) => {
    setHome(e.target.value);
  };

  const onChangeFavicon = (e) => {
    setFavicon(e.target.value);
  };

  return (
    <button className="searchButton" onClick={handleAddModalOpen}>
      <div className="searchButton__container">
        <div className="searchButton__iconContainer">
          <div className="searchButton__icon">
            <AddIcon className="searchButton__favicon" />
          </div>
        </div>
        <span className="searchButton__label">Add Search</span>
        <ModalContainer open={addModalOpen} handleClose={handleAddModalClose}>
          <AddSearchModal
            addItem={addItemFunc}
            onChangeSite={onChangeSite}
            handleClose={handleAddModalClose}
            data={data}
            isDefault={newDefault}
            onChangeDefault={onChangeDefault}
            color={newColor}
            onChangeColor={onChangeColor}
            onCreateCustom={onCreateCustom}
          />
        </ModalContainer>
        <ModalContainer
          open={customModalOpen}
          handleClose={handleCustomModalClose}
        >
          <CustomSearchModal
            addCustom={addCustomFunc}
            name={name}
            onChangeName={onChangeName}
            prefix={prefix}
            onChangePrefix={onChangePrefix}
            home={home}
            onChangeHome={onChangeHome}
            favicon={favicon}
            onChangeFavicon={onChangeFavicon}
            handleClose={handleCustomModalClose}
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
