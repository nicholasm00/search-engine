import React, { useState } from 'react';
import { BlockPicker } from 'react-color';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { IconButton, Tooltip, ClickAwayListener } from '@material-ui/core';
import './ColorPicker.scss';

export default function ColorPicker({ color, onChangeColor }) {
  const [open, setOpen] = useState(false);

  const colorArr = [
    '#4285f4',
    '#18ca58',
    '#fdc216',
    '#ed1b1a',
    '#8715dc',
    '#1c50b9',
    '#00ad8d',
    '#ff720a',
    '#af0954',
    '#5f5f5f',
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
