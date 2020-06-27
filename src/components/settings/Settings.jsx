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
} from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import './Settings.scss';

const items = [
  { name: 'Edit Dashboard', button: true },
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

const SettingsItem = ({ name }) => {
  return (
    <ListItem button>
      <ListItemText primary={name} />
    </ListItem>
  );
};

const SettingsCard = ({ onClickAway, darkMode, updateDarkMode }) => {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Card className="settingsCard">
        <List>
          <SettingsItemDarkMode
            darkMode={darkMode}
            updateDarkMode={updateDarkMode}
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

export default function Settings({ darkMode, updateDarkMode }) {
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
