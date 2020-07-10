import React, { useState } from 'react';
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
  Snackbar,
  Slide,
} from '@material-ui/core';
import Autocomplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import { HelpIcon, CloseIcon } from '@material-ui/icons/Help';
import './Modal.scss';

const filter = createFilterOptions();

export const ResetDashModal = ({ handleClose, resetDashboard }) => {
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

// function SlideTransition(props) {
//   return <Slide {...props} direction="up" />;
// }

// export const DeleteSearchAlert = () => {

//   const [state, setState] = React.useState({
//     open: false,
//     Transition: Fade,
//   });

//   const handleClick = (Transition) => () => {
//     setState({
//       open: true,
//       Transition,
//     });
//   };

//   const handleClose = () => {
//     setState({
//       ...state,
//       open: false,
//     });
//   };
//   return (
//     <div className="deleteAlert">
//       <Button onClick={handleClick(SlideTransition)}>delete alert</Button>
//       <Snackbar
//         open={state.open}
//         autoHideDuration={6000}
//         onClose={handleClose}
//         TransitionComponent={state.Transition}
//         message="Search deleted"
//         key={state.Transition.name}
//         action={
//           <React.Fragment>
//             <Button color="secondary" size="small" onClick={handleClose}>
//               Undo
//             </Button>
//             {/* <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
//               <CloseIcon fontSize="small" />
//             </IconButton> */}
//           </React.Fragment>
//         }
//       />
//     </div>
//   );
// }

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
  triggerAlert,
}) => {

  const handleDeleteItem = () => {
    deleteItem();
    //handleClick(SlideTransition);
    triggerAlert(true);
  }

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
          <Button
            className="modal__button -secondary"
            onClick={handleDeleteItem}
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

  return (
    <Card className="modal">
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
          filterOptions={filterOptions}
        />
        <ColorPicker color={color} onChangeColor={onChangeColor} />
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
