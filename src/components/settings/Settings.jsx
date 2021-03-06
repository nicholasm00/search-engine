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
  Divider,
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import './Settings.scss';
import '../searchbutton/SearchButton.scss';

const items = [
  { name: 'Send feedback', link: 'https://forms.gle/5joWCZYEDisC35Hj9' },
];

const SettingsItemDarkMode = ({ darkMode, updateDarkMode }) => {
  const onChange = (event, value) => {
    updateDarkMode(value);
  };

  return (
    <ListItem>
      <ListItemText primary="Dark mode" />
      <ListItemSecondaryAction>
        <Switch onChange={onChange} checked={darkMode} color="primary" />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const SettingsItemHistory = ({ autocomplete, updateAutocomplete }) => {
  const onChange = (event, value) => {
    updateAutocomplete(value);
  };

  return (
    <ListItem>
      <ListItemText primary="Show search history" />
      <ListItemSecondaryAction>
        <Switch onChange={onChange} checked={autocomplete} color="primary" />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const SettingsItemReset = ({ resetDashboard, setSettingsOpen }) => {
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
    setSettingsOpen(false);
    resetDashboard();
  };

  return (
    <div>
      <ListItem button onClick={handleModalOpen}>
        <ListItemText primary="Reset dashboard" />
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

const SettingsItem = ({ name, link }) => {
  const onClick = () => {
    if (link) window.open(link, '_blank');
  };

  return (
    <ListItem button onClick={onClick}>
      <ListItemText primary={name} />
    </ListItem>
  );
};

const SettingsCard = ({
  onClickAway,
  darkMode,
  updateDarkMode,
  autocomplete,
  updateAutocomplete,
  resetDashboard,
  setSettingsOpen,
}) => {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Card className="settingsCard">
        <List>
          <SettingsItemDarkMode
            darkMode={darkMode}
            updateDarkMode={updateDarkMode}
          />
          <SettingsItemHistory
            autocomplete={autocomplete}
            updateAutocomplete={updateAutocomplete}
          />
        </List>
        <Divider />
        <List>
          <SettingsItemReset
            resetDashboard={resetDashboard}
            setSettingsOpen={setSettingsOpen}
          />
          {items.map((i) => (
            <SettingsItem key={i.name} name={i.name} link={i.link} />
          ))}
        </List>
      </Card>
    </ClickAwayListener>
  );
};

export default function Settings({
  darkMode,
  updateDarkMode,
  autocomplete,
  updateAutocomplete,
  resetDashboard,
}) {
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
          autocomplete={autocomplete}
          updateAutocomplete={updateAutocomplete}
          setSettingsOpen={setOpen}
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
