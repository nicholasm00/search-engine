import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { IconButton, Tooltip, ClickAwayListener } from '@material-ui/core';
import './ColorPicker.scss';

export default function ColorPicker({ color, onChangeColor }) {
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
          <div className="colorPicker">
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
}
