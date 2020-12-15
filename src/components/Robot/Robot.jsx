import React from 'react';

import classes from './Robot.module.css';
import left from '../../assets/android-left.png';
import right from '../../assets/android-right.png';
import up from '../../assets/android-up.png';
import down from '../../assets/android-down.png';
import { NORTH, SOUTH, EAST, WEST } from '../../config/constants';

const Robot = props => {
  let img = null;
  if (props.f === NORTH) img = up;
  if (props.f === SOUTH) img = down;
  if (props.f === EAST) img = right;
  if (props.f === WEST) img = left;

  return <img {...props} alt='Robot' className={classes.robot} src={img} />;
};

export default Robot;
