/* eslint-disable jest/no-conditional-expect */
import { act, renderHook } from '@testing-library/react-hooks';

import { useRobotHook } from '../../hoc/useRobotHook';
import {
  NORTH,
  SOUTH,
  EAST,
  WEST,
  MIN_VALUE,
  MAX_VALUE
} from '../../config/constants';

//////////////////////////////////////////////////////////////////////////////////
// Test Scenario 1: Test whether the robot is placed correctly or not          //
// Test Scenario 2: Test whether the robot is moved to  Top without any error.//
// Test Scenario 3: Test whether the robot is falling from the table          //
// Test Scenario 4: Test place the robot on a wrong unit on the table         //
// Test Scenario 5: Test the turn left to whether is working correctly        //
// Test Scenario 6: Test the turn right to whether is working correctly       //
// Test Scenario 7: Test the turn right twice to whether is working correctly //
// Test Scenario 8: Test the turn left twice to whether is working correctly //
// Test Scenario 9: Test the turn right and move to the end of the table     //
// Test Scenario 10:Test the turn left and move to the end of the table      //
////////////////////////////////////////////////////////////////////////////////

describe('Robot Movements', () => {
  ////////////////////////////////////////////////////////////////////////////////
  //   Test Scenario 1:   Test whether the robot is placed correctly or not.   //
  //////////////////////////////////////////////////////////////////////////////
  it('Place the robot at position X:2, Y:2, face:NORTH', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;

    act(() => {
      result.current.handlePlacementXYValues({
        x,
        y,
        f
      });
    });

    jest.useFakeTimers();
    setTimeout(() => {
      expect(result.current.placeValues.x).toBe(x);
      expect(result.current.placeValues.y).toBe(y);
      expect(result.current.placeValues.f).toBe(f);
    }, 100);
    jest.runAllTimers();
  });

  //////////////////////////////////////////////////////////////////////////////////////
  //  Test Scenario 2:   Test whether the robot is moved to  Top without any error.   //
  ////////////////////////////////////////////////////////////  /////////////////////////
  it('Robot goes to Top without Error', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;
    act(() => {
      result.current.updatePlacementXYValues(null, null, {
        x,
        y,
        f
      });
    });
    jest.useFakeTimers();
    setTimeout(() => {
      callHandlePlacement();
    }, 100);

    const callHandlePlacement = () => {
      act(() => {
        result.current.handlePlacement();
      });
    };

    jest.useFakeTimers();
    setTimeout(() => {
      expect(result.current.placeValues.x).toBe(x);
      expect(result.current.placeValues.y).toBe(y);
      expect(result.current.placeValues.f).toBe(f);
      callHandleMovement();
      callHandleMovement();
    }, 100);

    const callHandleMovement = () => {
      act(() => {
        y++;
        result.current.handleMove();
      });
    };

    jest.useFakeTimers();
    setTimeout(() => {
      result.current.logs.forEach(log => {
        const errorExists = log.includes('ERROR!!');
        if (errorExists) {
          // if any logs contain 'ERROR!!' push the error
          expect(errorExists).toBe(false);
        }
      });
      expect(result.current.robotValues.x).toBe(x);
      expect(result.current.robotValues.y).toBe(y);
      expect(result.current.robotValues.f).toBe(f);
    }, 100);

    jest.runAllTimers();
  });

  ///////////////////////////////////////////////////////////////////////////////////////
  //   Test Scenario 3:  Test whether the robot is moved to  Top without any error.   //
  ////////////////////////////////////////////////////////////  ////////////////////////
  it('Is falling from the table', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;
    act(() => {
      result.current.updatePlacementXYValues(null, null, {
        x,
        y,
        f
      });
    });
    jest.useFakeTimers();
    setTimeout(() => {
      callHandlePlacement();
    }, 100);

    const callHandlePlacement = () => {
      act(() => {
        result.current.handlePlacement();
      });
    };

    jest.useFakeTimers();
    setTimeout(() => {
      expect(result.current.placeValues.x).toBe(x);
      expect(result.current.placeValues.y).toBe(y);
      expect(result.current.placeValues.f).toBe(f);
      callHandleMovement();
      callHandleMovement();
      // The robot is at the very top now. try to move once again
      callHandleMovement();
    }, 100);

    const callHandleMovement = () => {
      act(() => {
        y++;
        result.current.handleMove();
      });
    };

    jest.useFakeTimers();
    setTimeout(() => {
      // if X and Y values are in the range, it means the robot did not fall from the table
      expect(result.current.robotValues.x).toBeGreaterThanOrEqual(MIN_VALUE);
      expect(result.current.robotValues.x).toBeLessThanOrEqual(MAX_VALUE);
      expect(result.current.robotValues.y).toBeGreaterThanOrEqual(MIN_VALUE);
      expect(result.current.robotValues.y).toBeLessThanOrEqual(MAX_VALUE);
    }, 100);

    jest.runAllTimers();
  });

  ////////////////////////////////////////////////////////////////////////////////
  //    Test Scenario 4: Test place the robot on a wrong unit on the table      //
  ///////////////////////////////////////////////////////////////////////////////
  it('Try to place the robot at position X:5, Y:2, face:NORTH', () => {
    const { result } = renderHook(useRobotHook);
    let x = 5;
    let y = 2;
    let f = NORTH;

    act(() => {
      // There is no X:5 on the table. try to use this and check the robot coordinates after the placement
      result.current.handlePlacementXYValues({
        x,
        y,
        f
      });
    });

    jest.useFakeTimers();
    setTimeout(() => {
      expect(result.current.placeValues.x).toBeGreaterThanOrEqual(MIN_VALUE);
      expect(result.current.placeValues.x).toBeLessThanOrEqual(MAX_VALUE);
      expect(result.current.placeValues.y).toBeGreaterThanOrEqual(MIN_VALUE);
      expect(result.current.placeValues.y).toBeLessThanOrEqual(MAX_VALUE);
    }, 100);
    jest.runAllTimers();
  });

  ////////////////////////////////////////////////////////////////////////////////
  //   Test Scenario 5: Test the turn left to whether is working correctly     //
  //////////////////////////////////////////////////////////////////////////////
  it('Place the robot facing as NORTH and then turn LEFT. The robot face should be WEST', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;
    let newPosition = WEST;
    act(() => {
      result.current.handlePlacementXYValues({
        x,
        y,
        f
      });
    });

    jest.useFakeTimers();

    setTimeout(() => {
      callHandlePlacement();
    }, 100);

    const callHandlePlacement = () => {
      act(() => {
        result.current.handlePlacement();
        handleLeft();
      });
    };

    const handleLeft = () => {
      setTimeout(() => {
        act(() => {
          result.current.handleLeftRight(-1); //Turn Left
          TurnLeft();
        });
      }, 100);
    };
    const TurnLeft = () => {
      setTimeout(() => {
        expect(result.current.robotValues.f).toBe(newPosition);
      }, 100);
    };
    jest.runAllTimers();
  });

  ////////////////////////////////////////////////////////////////////////////////
  //   Test Scenario 6: Test the turn right to whether is working correctly     //
  //////////////////////////////////////////////////////////////////////////////
  it('Place the robot facing as NORTH and then turn RIGHT. The robot face should be EAST', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;
    let newPosition = EAST;
    act(() => {
      result.current.handlePlacementXYValues({
        x,
        y,
        f
      });
    });

    jest.useFakeTimers();

    setTimeout(() => {
      callHandlePlacement();
    }, 100);

    const callHandlePlacement = () => {
      act(() => {
        result.current.handlePlacement();
        handleRight();
      });
    };

    const handleRight = () => {
      setTimeout(() => {
        act(() => {
          result.current.handleLeftRight(1); //Turn Right
          TurnRight();
        });
      }, 100);
    };
    const TurnRight = () => {
      setTimeout(() => {
        expect(result.current.robotValues.f).toBe(newPosition);
      }, 100);
    };
    jest.runAllTimers();
  });
  ////////////////////////////////////////////////////////////////////////////////
  // Test Scenario 7: Test the turn right twice to whether is working correctly //
  ///////////////////////////////////////////////////////////////////////////////
  it('Place the robot facing as NORTH and then turn RIGHT twice. The robot face should be SOUTH', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;
    let newPosition = SOUTH;
    act(() => {
      result.current.handlePlacementXYValues({
        x,
        y,
        f
      });
    });

    jest.useFakeTimers();

    setTimeout(() => {
      callHandlePlacement();
    }, 100);

    const callHandlePlacement = () => {
      act(() => {
        result.current.handlePlacement();
        handleRight();
        handleRight();
      });
    };

    const handleRight = () => {
      setTimeout(() => {
        act(() => {
          result.current.handleLeftRight(1); //Turn Right
          TurnRight();
        });
      }, 100);
    };
    const TurnRight = () => {
      setTimeout(() => {
        expect(result.current.robotValues.f).toBe(newPosition);
      }, 100);
    };
    jest.runAllTimers();
  });
  ////////////////////////////////////////////////////////////////////////////////
  //   Test Scenario 8: Test the turn left twice to whether is working correctly     //
  //////////////////////////////////////////////////////////////////////////////
  it('Place the robot facing as NORTH and then turn LEFT twice. The robot face should be EAST', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;
    let newPosition = SOUTH;
    act(() => {
      result.current.handlePlacementXYValues({
        x,
        y,
        f
      });
    });

    jest.useFakeTimers();

    setTimeout(() => {
      callHandlePlacement();
    }, 100);

    const callHandlePlacement = () => {
      act(() => {
        result.current.handlePlacement();
        handleRight();
        handleRight();
      });
    };

    const handleRight = () => {
      setTimeout(() => {
        act(() => {
          result.current.handleLeftRight(1); //Turn Right
          TurnRight();
        });
      }, 100);
    };
    const TurnRight = () => {
      setTimeout(() => {
        expect(result.current.robotValues.f).toBe(newPosition);
      }, 100);
    };
    jest.runAllTimers();
  });
  //////////////////////////////////////////////////////////////////////////////////////
  // Test Scenario 9: Test the turn right and move to the end of the table             //
  ////////////////////////////////////////////////////////////  /////////////////////////
  it('turn right and move to the end of the table', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;
    act(() => {
      result.current.updatePlacementXYValues(null, null, {
        x,
        y,
        f
      });
    });
    jest.useFakeTimers();
    setTimeout(() => {
      callHandlePlacement();
    }, 100);

    const callHandlePlacement = () => {
      act(() => {
        result.current.handlePlacement();
        handleRight();
      });
    };

    const handleRight = () => {
      setTimeout(() => {
        act(() => {
          result.current.handleLeftRight(1); //Turn Right
          TurnRight();
        });
      }, 100);
    };
    const TurnRight = () => {
      setTimeout(() => {
        move();
      }, 100);
    };

    jest.useFakeTimers();

    const move = () => {
      setTimeout(() => {
        callHandleMovement();
        callHandleMovement();
        checkResult();
      }, 100);
    };

    const callHandleMovement = () => {
      act(() => {
        x++;
        result.current.handleMove();
      });
    };

    jest.useFakeTimers();
    const checkResult = () => {
      setTimeout(() => {
        // // The robot should be end the very right of the table
        expect(result.current.robotValues.x).toBe(MAX_VALUE);
        expect(result.current.robotValues.y).toBe(y);
      }, 100);
    };
    jest.runAllTimers();
  });
  //////////////////////////////////////////////////////////////////////////////////////
  // Test Scenario 10: Test the turn left and move to the end of the table             //
  ////////////////////////////////////////////////////////////  /////////////////////////
  it('turn left and move to the end of the table', () => {
    const { result } = renderHook(useRobotHook);
    let x = 2;
    let y = 2;
    let f = NORTH;
    act(() => {
      result.current.updatePlacementXYValues(null, null, {
        x,
        y,
        f
      });
    });
    jest.useFakeTimers();
    setTimeout(() => {
      callHandlePlacement();
    }, 100);

    const callHandlePlacement = () => {
      act(() => {
        result.current.handlePlacement();
        handleLeft();
      });
    };

    const handleLeft = () => {
      setTimeout(() => {
        act(() => {
          result.current.handleLeftRight(-1); //Turn Left
          TurnLeft();
        });
      }, 100);
    };
    const TurnLeft = () => {
      setTimeout(() => {
        move();
      }, 100);
    };

    jest.useFakeTimers();

    const move = () => {
      setTimeout(() => {
        callHandleMovement();
        callHandleMovement();
        checkResult();
      }, 100);
    };

    const callHandleMovement = () => {
      act(() => {
        x++;
        result.current.handleMove();
      });
    };

    jest.useFakeTimers();
    const checkResult = () => {
      setTimeout(() => {
        // The robot should be end the very left of the table
        expect(result.current.robotValues.x).toBe(MIN_VALUE);
        expect(result.current.robotValues.y).toBe(y);
      }, 100);
    };
    jest.runAllTimers();
  });
});
