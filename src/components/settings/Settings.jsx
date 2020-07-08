import React, { useState } from 'react';
import { ModalContainer, ResetDashModal } from '../modal/Modal';
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
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import './Settings.scss';
import '../searchbutton/SearchButton.scss';

const items = [{ name: 'Feedback', button: true }];

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

  const handleResetDashboard = () => {
    setModalOpen(false);
    resetDashboard();
  };

  return (
    <div>
      <ListItem button onClick={handleModalOpen}>
        <ListItemText primary="Reset Dashboard" />
      </ListItem>
      <ModalContainer open={modalOpen} handleClose={handleModalClose}>
        <ResetDashModal
          resetDashboard={handleResetDashboard}
          handleClose={handleModalClose}
        />
      </ModalContainer>
    </div>
  );
};

const SettingsItem = ({ name }) => {
  return (
    <ListItem button>
      <ListItemText primary={name} />
    </ListItem>
  );
};

const SettingsCard = ({
  onClickAway,
  darkMode,
  updateDarkMode,
  resetDashboard,
}) => {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Card className="settingsCard">
        <List>
          <SettingsItemDarkMode
            darkMode={darkMode}
            updateDarkMode={updateDarkMode}
          />
          <SettingsItemReset resetDashboard={resetDashboard} />
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

export default function Settings({ darkMode, updateDarkMode, resetDashboard }) {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen((prev) => !prev);
  };

  const onClickAway = () => {
    setOpen(false);
  };

  const getClasses = () => {
    let classes = ['settings__icon'];
    if (open) classes.push('-open');
    return classes.join(' ');
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
        <SettingsIcon className={getClasses()} />
      </IconButton>
    </Tooltip>
  );
}
