import React from 'react';
import ColorPicker from '../colorpicker/ColorPicker';
import DefaultBox from '../defaultbox/DefaultBox';
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  Button,
  TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import './Modal.scss';

export const ResetDashModal = ({ handleClose, resetDashboard }) => {
  return (
    <Card className="modal -confirmation">
      <div className="modal__header">Are you sure?</div>
      <div className="modal__row">
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          className="modal__button -primary"
          onClick={resetDashboard}
          variant="contained"
        >
          Yes
        </Button>
      </div>
    </Card>
  );
};

export const EditSearchModal = ({
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
    <Card className="modal">
      <div className="modal__header">{`Edit '${name}'`}</div>
      <div className="modal__row">
        <TextField
          onChange={onChangeName}
          className="modal__input"
          defaultValue={name}
          label="Name"
          variant="outlined"
        />
        <ColorPicker color={color} onChangeColor={onChangeColor} />
      </div>
      <DefaultBox onChangeDefault={onChangeDefault} isDefault={isDefault} />
      <div className="modal__row">
        <div className="modal__buttons">
          <Button onClick={deleteItem} variant="outlined">
            Delete
          </Button>
        </div>
        <div className="modal__buttons">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            className="modal__button -primary"
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

export const AddSearchModal = ({
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
    <Card className="modal">
      <div>Add Search</div>
      <div className="modal__row">
        <Autocomplete
          onChange={onChangeSite}
          className="modal__input"
          options={data}
          getOptionLabel={(item) => item.name}
          renderInput={(params) => (
            <TextField {...params} label="Site" variant="outlined" />
          )}
        />
        <ColorPicker color={color} onChangeColor={onChangeColor} />
      </div>
      <DefaultBox onChangeDefault={onChangeDefault} isDefault={isDefault} />
      <div className="modal__row">
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={addItem}
          variant="contained"
          className="modal__button -primary"
        >
          Add
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
