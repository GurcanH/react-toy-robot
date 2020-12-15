import React, { useEffect, useState } from 'react';

import classes from './Table.module.css';
import Robot from '../Robot/Robot';
import { MIN_VALUE, MAX_VALUE } from '../../config/constants';

const Table = props => {
  const [table, setTable] = useState([]);

  useEffect(() => {
    const arr = [];
    let key = 0;
    for (let i = MAX_VALUE; i >= MIN_VALUE; i--) {
      for (let j = MIN_VALUE; j <= MAX_VALUE; j++) {
        key++;
        arr.push(
          <div
            key={key}
            position-x={i}
            position-y={j}
            className={classes.divUnit}
          >
            ({i},{j})
            {Number(props.showRobot) &&
            i === Number(props.y) &&
            j === Number(props.x) ? (
              <Robot f={props.f} />
            ) : null}
          </div>
        );
      }
    }
    setTable(arr);
  }, [props.showRobot, props.x, props.y, props.f]);

  return <div className={classes.divMain}>{table}</div>;
};

export default Table;
