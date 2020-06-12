import React, { useState, useEffect } from 'react';
import {
  Tooltip,
  IconButton,
  ClickAwayListener,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@material-ui/core';
import { Brightness4 } from '@material-ui/icons';
import SettingsIcon from '@material-ui/icons/Settings';
import './Settings.scss';

const items = [
  { name: 'Edit Dashboard', button: true },
  { name: 'Feedback', button: true },
];

const SettingsItemDarkMode = () => {
  const [checked, setChecked] = useState(false);

  const rootElement = document.documentElement;

  useEffect(() => {
    let isDark = false;
    // check chrome storage sync
    setChecked(isDark);
  }, []);

  useEffect(() => {
    if (checked) {
      rootElement.classList.add('-dark');
    } else {
      rootElement.classList.remove('-dark');
    }
  }, [checked]);

  const onChange = (event, value) => {
    setChecked(value);
  };

  return (
    <ListItem>
      <ListItemIcon>
        <Brightness4 />
      </ListItemIcon>
      <ListItemText primary="Dark Mode" />
      <ListItemSecondaryAction>
        <Switch onChange={onChange} checked={checked} color="primary" />
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

const SettingsCard = ({ onClickAway }) => {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <Card className="settingsCard">
        <List>
          <SettingsItemDarkMode />
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

export default function Settings() {
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
      title={<SettingsCard onClickAway={onClickAway} />}
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
