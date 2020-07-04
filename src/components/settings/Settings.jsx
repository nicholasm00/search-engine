import React, { useState } from 'react';
import {
  Tooltip,
  IconButton,
  ClickAwayListener,
  Card,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Modal,
  Backdrop,
  Fade,
  Button,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import './Settings.scss';

const items = [
  { name: 'Feedback', button: true },
];

const SettingsItemDarkMode = ({ darkMode, updateDarkMode }) => {
  const onChange = (event, value) => {
    updateDarkMode(value);
  };

  return (
    <ListItem>
      <ListItemText primary="Dark Mode" />
      <ListItemSecondaryAction>
        <Switch onChange={onChange} checked={darkMode} color="primary" />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const SettingsItemReset = ({ resetDashboard }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalClose = (e) => {
    e.stopPropagation();
    setModalOpen(false);
  };

  const handleModalOpen = (e) => {
    e.stopPropagation();
    setModalOpen(true);
  };

  return (
    <div>
      <ListItem button onClick={handleModalOpen}>
        <ListItemText primary="Reset Dashboard" />
      </ListItem>
      <ModalContainer open={modalOpen} handleClose={handleModalClose}>
        <ModalCard
          resetDashboard={resetDashboard}
          handleClose={handleModalClose}
        />
      </ModalContainer>
    </div>
  );
}

const SettingsItem = ({ name }) => {
  return (
    <ListItem button>
      <ListItemText primary={name} />
    </ListItem>
  );
};

const SettingsCard = ({ onClickAway, darkMode, updateDarkMode, resetDashboard }) => {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Card className="settingsCard">
        <List>
          <SettingsItemDarkMode
            darkMode={darkMode}
            updateDarkMode={updateDarkMode}
          />
          <SettingsItemReset
            resetDashboard={resetDashboard}
          />
          {items.map((i) => (
            <SettingsItem
              key={i.name}
              name={i.name}
              icon={i.icon}
              switchArr={i.switchArr}
              button={i.button}
            />
          ))}
        </List>
      </Card>
    </ClickAwayListener>
  );
};

const ModalCard = ({ handleClose, resetDashboard }) => {
  return (
    <Card className="modal">
      <div className="modal__header">Are you sure?</div>
      <div className="modal__row">
        <div className="modal__buttons">
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

export default function Settings({ darkMode, updateDarkMode, resetDashboard }) {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  const onClickAway = () => {
    setOpen(false);
  };

  return (
    <Tooltip
      className="settings"
      title={
        <SettingsCard
          onClickAway={onClickAway}
          darkMode={darkMode}
          updateDarkMode={updateDarkMode}
          resetDashboard={resetDashboard}
        />
      }
      open={open}
      placement="bottom-end"
      interactive
    >
      <IconButton onClick={onClick}>
        <SettingsIcon className="settings__icon" />
      </IconButton>
    </Tooltip>
  );
}
