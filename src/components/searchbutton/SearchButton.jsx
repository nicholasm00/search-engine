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
  Tooltip,
  ClickAwayListener,
} from '@material-ui/core';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { BlockPicker } from 'react-color';
import './SearchButton.scss';

export const ColorPicker = ({ color, onChangeColor }) => {
  const [open, setOpen] = useState(false);

  const colorArr = [
    '#FF6900',
    '#FCB900',
    '#7BDCB5',
    '#00D084',
    '#8ED1FC',
    '#0693E3',
    '#ABB8C3',
    '#EB144C',
    '#F78DA7',
    '#9900EF',
  ];

  const onClickAway = () => {
    setOpen(false);
  };

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  const onChangeComplete = (col) => {
    onChangeColor(col.hex);
  };

  return (
    <Tooltip
      open={open}
      title={
        <ClickAwayListener onClickAway={onClickAway}>
          <div className="colorPickerModal">
            <BlockPicker
              color={color}
              colors={colorArr}
              onChangeComplete={onChangeComplete}
            />
          </div>
        </ClickAwayListener>
      }
      interactive
      placement="bottom"
    >
      <IconButton onClick={onClick} style={{ backgroundColor: color }}>
        <ColorLensIcon />
      </IconButton>
    </Tooltip>
  );
};

export const DefaultBox = ({ onChangeDefault, isDefault }) => {
  return (
    <div className="modalCard__checkbox">
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
    </div>
  );
};

const ModalCard = ({
  deleteItem,
  name,
  handleClose,
  editItem,
  onChangeName,
  isDefault,
  onChangeDefault,
  color,
  onChangeColor,
}) => {
  return (
    <Card className="modalCard">
      <div className="modalCard__header">{`Edit '${name}'`}</div>
      <div className="modalCard__row">
        <TextField
          onChange={onChangeName}
          className="modalCard__input"
          defaultValue={name}
          label="Name"
          variant="outlined"
        />
        <ColorPicker color={color} onChangeColor={onChangeColor} />
      </div>
      <DefaultBox onChangeDefault={onChangeDefault} isDefault={isDefault} />
      <div className="modalCard__row">
        <div className="modalCard__buttons">
          <Button onClick={deleteItem} variant="outlined">
            Delete
          </Button>
        </div>
        <div className="modalCard__buttons">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            className="modalCard__button -primary"
            onClick={editItem}
            variant="contained"
          >
            Save
          </Button>
        </div>
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

  return (
    <button
      className={getClasses()}
      onClick={updateSearchFunc}
      draggable={true}
      onDragOver={onDragOverFunc}
      onDragStart={onDragStartFunc}
      onDragEnd={onDragEndFunc}
      style={{ backgroundColor: (currSearchId === id ? color : null) }}
      title={name}
    >
      <div className="searchButton__container">
        <div className="searchButton__iconContainer">
          <img className="searchButton__iconContainer__icon" src={favicon} alt={name[0]} />
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
            color={newColor}
            onChangeColor={onChangeColor}
          />
        </ModalContainer>
      </div>
    </button>
  );
}
