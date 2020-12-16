import React from 'react';
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

import { MIN_VALUE, MAX_VALUE } from '../../config/constants';
import moduleClasses from './MainScreen.module.css';
import Table from '../Table/Table';
import { useRobotHook } from '../../hoc/useRobotHook';

const MainScreen = () => {
  const {
    placeValues,
    robotValues,
    showRobot,
    robotPlaced,
    logs,
    handleLeftRight,
    handleMove,
    handlePlacementXYValues,
    handlePlacement,
    handlePlacementFacing,
    handleReport,
    handleRefresh,
    arrayDirections
  } = useRobotHook();

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
          <span className={moduleClasses.span}>Robot Summon Place: </span>
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
