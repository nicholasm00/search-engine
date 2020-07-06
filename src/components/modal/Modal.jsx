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
  Link,
  Tooltip,
  IconButton,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HelpIcon from '@material-ui/icons/Help';
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
          Reset
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
          variant="filled"
          size="small"
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

const PrefixHelpTooltip = () => {
  return (
    <div className="tooltip">
      <p>
        For example, when searching{' '}
        <span className="tooltip__url -query">test 123</span> on YouTube, the
        result page URL is
      </p>
      <div className="tooltip__row">
        <span className="tooltip__url -prefix">
          https://www.youtube.com/results?search_query=
        </span>
        <span className="tooltip__url -query">test+123</span>
      </div>
      <div className="tooltip__row">
        <div className="tooltip__label tooltip__url -prefix">
          Search path prefix
        </div>
        <div className="tooltip__label tooltip__url -query">Query</div>
      </div>
    </div>
  );
};

const HomeHelpTooltip = () => {
  return (
    <div className="tooltip">
      <p>Add a link to the homepage to directly visit the website.</p>
      <p>
        After this custom search is added to the dashboard, simply select it and
        click the icon to go to the homepage.
      </p>
    </div>
  );
};

export const CustomSearchModal = ({
  addCustom,
  handleClose,
  name,
  onChangeName,
  prefix,
  onChangePrefix,
  home,
  onChangeHome,
  favicon,
  onChangeFavicon,
  isDefault,
  onChangeDefault,
  color,
  onChangeColor,
}) => {
  return (
    <Card className="modal -addCustom">
      <div>Add Custom Search</div>
      <div className="modal__row">
        <TextField
          onChange={onChangeName}
          className="modal__input"
          value={name}
          label="Name"
          variant="filled"
          size="small"
        />
        <ColorPicker color={color} onChangeColor={onChangeColor} />
      </div>
      <div className="modal__row">
        <TextField
          onChange={onChangePrefix}
          className="modal__input"
          value={prefix}
          label="Search path prefix"
          variant="filled"
          size="small"
        />
        <Tooltip title={<PrefixHelpTooltip />}>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="modal__row">
        <TextField
          onChange={onChangeHome}
          className="modal__input"
          value={home}
          label="Homepage link (optional)"
          variant="filled"
          size="small"
        />
        <Tooltip title={<HomeHelpTooltip />}>
          <IconButton>
            <HelpIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div className="modal__row">
        <TextField
          onChange={onChangeFavicon}
          className="modal__input"
          value={favicon}
          label="Favicon link (optional)"
          variant="filled"
          size="small"
        />
      </div>
      <DefaultBox onChangeDefault={onChangeDefault} isDefault={isDefault} />
      <div className="modal__row">
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button
          onClick={addCustom}
          variant="contained"
          className="modal__button -primary"
        >
          Add
        </Button>
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
  onCreateCustom,
}) => {
  return (
    <Card className="modal -addSearch">
      <div>Add Search</div>
      <div className="modal__row">
        <Autocomplete
          onChange={onChangeSite}
          className="modal__input"
          options={data}
          getOptionLabel={(item) => item.name}
          renderInput={(params) => (
            <TextField {...params} label="Site" variant="filled" size="small" />
          )}
        />
        <ColorPicker color={color} onChangeColor={onChangeColor} />
      </div>
      <div>
        <span>Or </span>
        <Link
          className="modal__link"
          onClick={onCreateCustom}
          color="inherit"
          variant="body2"
        >
          create a custom search
        </Link>
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
