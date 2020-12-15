import React, { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ButtonGroup,
  Button,
  MenuItem,
  MenuList,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import { selectOptions } from "../modules/options";

const LabelButton = ({ options, num }) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { first, second, third } = useSelector(({ options }) => ({
    first: options.first,
    second: options.second,
    third: options.third,
  }));

  const dispatch = useDispatch();
  const onSelectOptions = useCallback(
    (num, value) => dispatch(selectOptions(num, value)),
    [dispatch]
  );

  useEffect(() => {
    switch (num) {
      case 1:
        setSelectedIndex(first);
        break;
      case 2:
        setSelectedIndex(second);
        break;
      case 3:
        setSelectedIndex(third);
        break;
    }
  }, []);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    onSelectOptions(num, index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        variant="contained"
        color="primary"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick} style={{ color: "white" }}>
          {options[selectedIndex]}
        </Button>
        <Button
          color="primary"
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          style={{ color: "white" }}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu">
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      disabled={index === 0}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default LabelButton;
