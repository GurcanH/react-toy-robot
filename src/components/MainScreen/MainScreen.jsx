import React, { useState } from 'react';
import {
  TextField,
  Select,
  FormControl,
  InputLabel,
  Button,
  Icon,
  List,
  ListItemIcon,
  ListItemText,
  ListItem
} from '@material-ui/core';
import ArtTrackIcon from '@material-ui/icons/ArtTrack';

import {
  NORTH,
  SOUTH,
  EAST,
  WEST,
  MIN_VALUE,
  MAX_VALUE
} from '../../config/constants';
import moduleClasses from './MainScreen.module.css';
import Table from '../Table/Table';

const INITIAL_STATE = {
  x: '',
  y: '',
  f: ''
};

const MainScreen = () => {
  const [placeValues, setPlaceValues] = useState(INITIAL_STATE);
  const [robotValues, setRobotValues] = useState(INITIAL_STATE);

  const [showRobot, setShowRobot] = useState(false);
  const [robotPlaced, setRobotPlaced] = useState(false);
  const [logs, setLogs] = useState([]);

  const arrayDirections = [NORTH, EAST, SOUTH, WEST];

  ////////////////////////////////
  ////Robot movement functions///
  ///////////////////////////////
  const handleLeftRight = direction => {
    let newPosition = arrayDirections.indexOf(robotValues.f);
    newPosition += direction;

    if (newPosition > arrayDirections.length - 1) {
      newPosition = 0;
    } else if (newPosition < 0) {
      newPosition = arrayDirections.length - 1;
    }

    setRobotValues({ ...robotValues, f: arrayDirections[newPosition] });
    setShowRobot(false);
    addLog(`The robot turned to: ${arrayDirections[newPosition]}!`);
  };

  const addLog = log => {
    const updatedLogs = [...logs, log];
    setLogs(updatedLogs);
  };
  const handleMove = () => {
    let { f, x, y } = robotValues;

    setShowRobot(false);

    if (
      // If the robot needs to move North but it is at the very top
      // or the robot needs to move South but it is at the very bottom
      // or the robot needs to move West but it is  at the very left
      // or the robot needs to move East but it is  at the very right ignore the movement.
      (f === NORTH && y === MAX_VALUE) ||
      (f === SOUTH && y === MIN_VALUE) ||
      (f === WEST && x === MIN_VALUE) ||
      (f === EAST && x === MAX_VALUE)
    ) {
      addLog(
        `X position: ${x} - Y position: ${y}. The robot CAN'T move to ${f}!`
      );
      return;
    }

    // NORTH
    if (f === NORTH) y++;
    // SOUTH
    if (f === SOUTH) y--;
    // WEST
    if (f === WEST) x--;
    // EAST
    if (f === EAST) x++;

    // the robot can move, so go
    addLog(
      `The robot moved to X position: ${x}, Y position: ${y}, and facing: ${f}!`
    );
    setRobotValues({ ...robotValues, x, y });
  };

  ////////////////////////////////
  ////Robot placement functions///
  ///////////////////////////////
  const handlePlacementXYValues = el => {
    const { value, id } = el.target;

    if (Number(value) > MAX_VALUE) {
      el.target.value = MAX_VALUE;
    }
    if (Number(value) < MIN_VALUE || isNaN(value) || !value) {
      el.target.value = MIN_VALUE;
    }

    if (id === 'xval') {
      setPlaceValues({ ...placeValues, x: Number(el.target.value) });
    }
    if (id === 'yval') {
      setPlaceValues({ ...placeValues, y: Number(el.target.value) });
    }
    setShowRobot(false);
  };

  // Set the robot's place
  const handlePlacement = () => {
    // set robot placement values
    const { f, x, y } = placeValues;
    if (!f || !x || !y) {
      return;
    }
    const show = f.length > 0 && x >= MIN_VALUE && y >= MIN_VALUE;

    setRobotPlaced(show);
    setShowRobot(false);
    addLog(
      `The robot has been placed to X position: ${x}, Y position: ${y}, and facing: ${f}!`
    );
    // and set the robot position
    setRobotValues({ ...placeValues, x, y });
  };

  const handlePlacementFacing = el => {
    setPlaceValues({ ...placeValues, f: el.target.value });
    setShowRobot(false);
  };

  // Show report
  const handleReport = () => {
    setShowRobot(true);
  };

  const handleRefresh = () => {
    setShowRobot(false);
    setRobotPlaced(false);
    setRobotValues(INITIAL_STATE);
    setPlaceValues(INITIAL_STATE);
    setLogs([]);
  };

  const renderReport = () => {
    return logs.map((log, index) => {
      let style;
      if (log.indexOf('CAN') > 0) {
        style = { backgroundColor: 'red', color: 'white' };
      }
      return (
        <List key={index} component='nav' aria-label='main mailbox folders'>
          <ListItem button>
            <ListItemIcon>
              <ArtTrackIcon />
            </ListItemIcon>
            <ListItemText style={style} primary={log} />
          </ListItem>
        </List>
      );
    });
  };
  const renderDropdown = () => {
    const options = arrayDirections.map(el => (
      <option key={el} value={el}>
        {el}
      </option>
    ));

    return (
      <FormControl
        style={{ marginRight: '25px' }}
        className={moduleClasses.formControl}
      >
        <InputLabel htmlFor='face'>Face</InputLabel>
        <Select
          native
          value={placeValues.f}
          onChange={handlePlacementFacing}
          inputProps={{
            name: 'Face',
            id: 'face'
          }}
        >
          <option aria-label='None' value='' />
          {options}
        </Select>
      </FormControl>
    );
  };
  return (
    <div className={moduleClasses.mainDiv}>
      <Table
        showRobot={showRobot}
        x={robotValues.x}
        y={robotValues.y}
        f={robotValues.f}
      />
      <div className={moduleClasses.controlsDiv}>
        <div className={moduleClasses.firstControlDiv}>
          <span>Robot Summon Place: </span>
          <TextField
            style={{ marginRight: '15px' }}
            className={moduleClasses.input}
            onChange={handlePlacementXYValues}
            value={placeValues.x}
            InputProps={{ inputProps: { min: MIN_VALUE, max: MAX_VALUE } }}
            id='xval'
            label='X Value'
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
          />

          <TextField
            style={{ marginRight: '15px' }}
            className={moduleClasses.input}
            onChange={handlePlacementXYValues}
            value={placeValues.y}
            InputProps={{ inputProps: { min: MIN_VALUE, max: MAX_VALUE } }}
            id='yval'
            label='Y Value'
            InputLabelProps={{
              shrink: true
            }}
            variant='outlined'
          />

          {renderDropdown()}

          <Button
            style={{ marginRight: '25px' }}
            variant='outlined'
            color='primary'
            onClick={handlePlacement}
          >
            PLACE
          </Button>
        </div>
        <div className={moduleClasses.buttonControls}>
          <Button
            onClick={() => handleLeftRight(-1)}
            disabled={!robotPlaced}
            variant='contained'
            color='primary'
            startIcon={<Icon>keyboard_arrow_left</Icon>}
          >
            LEFT
          </Button>
          <Button
            disabled={!robotPlaced}
            variant='outlined'
            color='primary'
            onClick={handleMove}
          >
            MOVE
          </Button>
          <Button
            onClick={() => handleLeftRight(1)}
            disabled={!robotPlaced}
            variant='contained'
            color='primary'
            endIcon={<Icon>keyboard_arrow_right</Icon>}
          >
            RIGHT
          </Button>
        </div>
        <div className={moduleClasses.reportbuttonControls}>
          <Button
            onClick={handleReport}
            disabled={!robotPlaced}
            variant='contained'
            color='secondary'
            startIcon={<Icon>preview</Icon>}
          >
            REPORT
          </Button>

          <Button
            onClick={handleRefresh}
            disabled={!robotPlaced}
            variant='contained'
            color='secondary'
            startIcon={<Icon>preview</Icon>}
          >
            REFRESH
          </Button>
        </div>
        {showRobot ? (
          <div className={moduleClasses.reportDiv}>{renderReport()}</div>
        ) : null}
      </div>
    </div>
  );
};

export default MainScreen;
