import { useState } from 'react';

import {
  NORTH,
  SOUTH,
  EAST,
  WEST,
  MIN_VALUE,
  MAX_VALUE
} from '../config/constants';

export const useRobotHook = () => {
  const INITIAL_STATE = {
    x: '',
    y: '',
    f: ''
  };

  const [placeValues, setPlaceValues] = useState(INITIAL_STATE);
  const [robotValues, setRobotValues] = useState(INITIAL_STATE);

  const [showRobot, setShowRobot] = useState(false);
  const [robotPlaced, setRobotPlaced] = useState(false);
  const [logs, setLogs] = useState([]);

  const arrayDirections = [NORTH, EAST, SOUTH, WEST];

  const addLog = log => {
    const updatedLogs = [...logs, log];
    setLogs(updatedLogs);
  };

  ////////////////////////////////
  ////Robot movement functions///
  ///////////////////////////////
  const handleLeftRight = direction => {
    ////////////////////////////
    // LEFT : -1 ---- RIGHT: 1//
    ///////////////////////////
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
        `ERROR!! X position: ${x} - Y position: ${y}. The robot CAN'T move to ${f}!`
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
    if (!el.x) {
      // this is  a textbox controller
      const { value, id } = el.target;

      if (Number(value) > MAX_VALUE) {
        el.target.value = MAX_VALUE;
      }
      if (Number(value) < MIN_VALUE || isNaN(value) || !value) {
        el.target.value = MIN_VALUE;
      }

      const type = id === 'xval' ? 'x' : 'y';
      updatePlacementXYValues(type, Number(el.target.value));
    } else {
      // this is not  a textbox controller
      // so we need to get x and y values from the object

      if (el.x > MAX_VALUE) {
        el.x = MAX_VALUE;
      }
      if (el.y > MAX_VALUE) {
        el.y = MAX_VALUE;
      }
      if (el.x < MIN_VALUE) {
        el.x = MIN_VALUE;
      }
      if (el.y < MIN_VALUE) {
        el.y = MIN_VALUE;
      }

      updatePlacementXYValues(null, null, el);
    }
  };

  const updatePlacementXYValues = (type, value, obj) => {
    if (!obj) {
      setPlaceValues({ ...placeValues, [type]: value });
    } else {
      setPlaceValues({ ...placeValues, x: obj.x, y: obj.y, f: obj.f });
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

  return {
    placeValues,
    robotValues,
    showRobot,
    robotPlaced,
    logs,
    handleLeftRight,
    handleMove,
    handlePlacementXYValues,
    updatePlacementXYValues,
    handlePlacement,
    handlePlacementFacing,
    handleReport,
    handleRefresh,
    arrayDirections
  };
};
