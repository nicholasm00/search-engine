import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';

export default function DefaultBox({ onChangeDefault, isDefault }) {
  return (
    <div>
      <FormControlLabel
        label="Set as default"
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
}
