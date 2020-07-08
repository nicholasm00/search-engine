import React, { useState } from 'react';
import { ModalContainer, EditSearchModal } from '../modal/Modal';
import { IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './SearchButton.scss';

const LetterIcon = ({ letter }) => {
  return (
    <div className="letterIcon">
      <div className="letterIcon__letter" draggable={false}>
        {letter.toUpperCase()}
      </div>
    </div>
  );
};

export default function SearchButton({
  name,
  path,
  updateSearch,
  id,
  deleteItem,
  editItem,
  currSearchId,
  isDefault,
  color,
  favicon,
  index,
  dragStartIndex,
  dragOverIndex,
  onDragStart,
  onDragOver,
  onDragEnd,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState(name);
  const [newDefault, setNewDefault] = useState(isDefault);
  const [newColor, setNewColor] = useState(color);

  const updateSearchFunc = () => {
    updateSearch(id);
  };

  const deleteItemFunc = (e) => {
    e.stopPropagation();
    deleteItem(id);
  };

  const editItemFunc = () => {
    if (newName === '') return;
    editItem(id, newName, newDefault, newColor);
    setModalOpen(false);
  };

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  const handleModalClose = (e) => {
    e.stopPropagation();
    setModalOpen(false);
    setNewName(name);
    setNewDefault(isDefault);
    setNewColor(color);
  };

  const onChangeName = (e) => {
    setNewName(e.target.value);
  };

  const onChangeDefault = (e) => {
    setNewDefault(e.target.checked);
  };

  const onChangeColor = (col) => {
    setNewColor(col);
  };

  const onDragOverFunc = (e) => {
    e.preventDefault();
    onDragOver(index);
  };

  const onDragStartFunc = () => {
    onDragStart(index);
  };

  const onDragEndFunc = () => {
    onDragEnd(index);
  };

  const getClasses = () => {
    let classes = ['searchButton'];
    if (currSearchId === id) {
      classes.push('-curr');
    }
    if (dragOverIndex !== -1) {
      if (dragStartIndex === index) {
        classes.push('-dragStart');
      } else if (dragOverIndex === index) {
        classes.push('-dragOver');
      }
    }
    return classes.join(' ');
  };

  const onClickIcon = () => {
    if (currSearchId === id && path !== '') {
      window.location.href = path;
    }
  };

  return (
    <button
      className={getClasses()}
      onClick={updateSearchFunc}
      draggable={true}
      onDragOver={onDragOverFunc}
      onDragStart={onDragStartFunc}
      onDragEnd={onDragEndFunc}
      style={{ backgroundColor: currSearchId === id ? color : null }}
      title={name}
    >
      <div className="searchButton__container">
        <div className="searchButton__icon" onClick={onClickIcon}>
          {favicon ? (
            <img
              className="searchButton__favicon"
              src={favicon}
              draggable={false}
            />
          ) : (
            <LetterIcon letter={name[0]} />
          )}
        </div>
        <span className="searchButton__label">{name}</span>
        <IconButton className="searchButton__more" onClick={handleModalOpen}>
          <MoreVertIcon className="searchButton__more__icon" />
        </IconButton>
        <ModalContainer open={modalOpen} handleClose={handleModalClose}>
          <EditSearchModal
            deleteItem={deleteItemFunc}
            name={name}
            handleClose={handleModalClose}
            editItem={editItemFunc}
            onChangeName={onChangeName}
            isDefault={isDefault}
            onChangeDefault={onChangeDefault}
            color={newColor}
            onChangeColor={onChangeColor}
          />
        </ModalContainer>
      </div>
    </button>
  );
}
