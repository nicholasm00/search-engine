import React, { useState } from 'react';
import {
  IconButton,
  Modal,
  Backdrop,
  Fade,
  Card,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './SearchButton.scss';

const ModalCard = ({
  deleteItem,
  name,
  handleClose,
  editItem,
  onChangeName,
  isDefault,
  onChangeDefault,
}) => {
  return (
    <Card className="modalCard">
      <div>{`Edit '${name}'`}</div>
      <TextField
        onChange={onChangeName}
        className="modalCard__input"
        defaultValue={name}
        label="Name"
        variant="filled"
      />
      <FormControlLabel
        label="Make Default"
        control={
          <Checkbox
            color="default"
            onChange={onChangeDefault}
            defaultChecked={isDefault}
          />
        }
      />
      <div>
        <Button onClick={deleteItem} variant="outlined">
          Delete
        </Button>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={editItem} variant="contained">
          Save
        </Button>
      </div>
    </Card>
  );
};

export const ModalContainer = ({ open, handleClose, children }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>{children}</Fade>
    </Modal>
  );
};

export default function SearchButton({
  name,
  updateSearch,
  id,
  deleteItem,
  editItem,
  currSearchId,
  isDefault,
  color,
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

  const updateSearchFunc = () => {
    updateSearch(id);
  };

  const deleteItemFunc = () => {
    deleteItem(id);
  };

  const editItemFunc = () => {
    if (newName === '') return;
    editItem(id, newName, newDefault);
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onChangeName = (e) => {
    setNewName(e.target.value);
  };

  const onChangeDefault = (e) => {
    setNewDefault(e.target.checked);
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

  return (
    <button
      className={getClasses()}
      onClick={updateSearchFunc}
      draggable={true}
      onDragOver={onDragOverFunc}
      onDragStart={onDragStartFunc}
      onDragEnd={onDragEndFunc}
    >
      <div className="searchButton__container">
        <div style={{ backgroundColor: (currSearchId === id ? color : null) }} className="searchButton__iconContainer" >
          <div className="searchButton__icon" />
        </div>
        <span className="searchButton__label">{name}</span>
        <IconButton className="searchButton__more" onClick={handleModalOpen}>
          <MoreVertIcon className="searchButton__more__icon" />
        </IconButton>
        <ModalContainer open={modalOpen} handleClose={handleModalClose}>
          <ModalCard
            deleteItem={deleteItemFunc}
            name={name}
            handleClose={handleModalClose}
            editItem={editItemFunc}
            onChangeName={onChangeName}
            isDefault={isDefault}
            onChangeDefault={onChangeDefault}
          />
        </ModalContainer>
      </div>
    </button>
  );
}
