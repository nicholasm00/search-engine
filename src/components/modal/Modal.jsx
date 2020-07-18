import React, { useEffect } from 'react';
import ColorPicker from '../colorpicker/ColorPicker';
import DefaultBox from '../defaultbox/DefaultBox';
import {
  Modal,
  Backdrop,
  Fade,
  Card,
  Button,
  TextField,
  Tooltip,
  IconButton,
  Link,
} from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import HelpIcon from '@material-ui/icons/Help';
import './Modal.scss';

const filter = createFilterOptions();

export const ResetDashModal = ({ handleClose, resetDashboard }) => {
  const keyDownFunction = (event) => {
    if (event.key === 'Enter') {
      resetDashboard();
    } else if (event.keyCode === 27) {
      handleClose(event);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownFunction, false);

    return () => {
      document.removeEventListener("keydown", keyDownFunction, false);
    };
  }, []);

  return (
    <Card className="modal -confirmation">
      <div className="modal__header">Are you sure?</div>
      <div className="modal__row">
        <Button
          className="modal__button -secondary"
          onClick={handleClose}
          variant="outlined"
        >
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
  const keyDownFunction = (event) => {
    if (event.key === 'Enter') {
      editItem();
    } else if (event.keyCode === 27) {
      handleClose(event);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownFunction, false);

    return () => {
      document.removeEventListener("keydown", keyDownFunction, false);
    };
  }, []);

  return (
    <Card className="modal" onClick={(e) => e.stopPropagation()}>
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
          <Button
            className="modal__button -secondary"
            onClick={deleteItem}
            variant="outlined"
          >
            Delete
          </Button>
        </div>
        <div className="modal__buttons">
          <Button
            className="modal__button -secondary"
            onClick={handleClose}
            variant="outlined"
          >
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
      <p>
        Directly visit the homepage of a website by hitting enter when the
        searchbar is blank.
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
  const keyDownFunction = (event) => {
    if (event.key === 'Enter') {
      addCustom();
    } else if (event.keyCode === 27) {
      handleClose(event);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownFunction, false);

    return () => {
      document.removeEventListener("keydown", keyDownFunction, false);
    };
  }, []);

  return (
    <Card className="modal -addCustom">
      <div className="modal__header -addSearch">Add Custom Search</div>
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
        <Button
          onClick={handleClose}
          variant="outlined"
          className="modal__button -secondary"
        >
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
  const filterOptions = (options, params) => {
    const filtered = filter(options, params);
    const inputValue = params.inputValue;
    if (inputValue !== '') {
      filtered.push({
        inputValue: inputValue,
        name: `Add "${inputValue}"`,
      });
    }
    return filtered;
  };

  const keyDownFunction = (event) => {
    if (event.key === 'Enter') {
      addItem();
    } else if (event.keyCode === 27) {
      handleClose(event);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyDownFunction, false);

    return () => {
      document.removeEventListener("keydown", keyDownFunction, false);
    };
  }, []);

  return (
    <Card className="modal -addSearch">
      <div className="modal__header -addSearch">Add Search</div>
      <div className="modal__row">
        <Autocomplete
          onChange={onChangeSite}
          className="modal__input"
          options={data}
          getOptionLabel={(item) => item.name}
          renderInput={(params) => (
            <TextField {...params} label="Site" variant="filled" size="small" />
          )}
          filterOptions={filterOptions}
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
        <Button
          className="modal__button -secondary"
          onClick={handleClose}
          variant="outlined"
        >
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
