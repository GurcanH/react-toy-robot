# React-Toy-Robot-Project

The application is a simulation of a toy robot moving on a square table top, of dimensions 5 units x 5 units.
<br/>
There are no other obstructions on the table surface. The robot is free to roam around the surface of the table, but must be prevented from falling to destruction.
<br/>
Any movement that would result in the robot falling from the table must be prevented, however further valid movement commands must still be allowed.
<br/>
<br/>

The application has a graphical interface built by React.
<br/>
Once the robot placed on the table, `left`, `right`, `move`, `button`, and `refresh` buttons will be enabled.
<br/>
<br/>

`PLACE` will put the toy robot on the table in position `X`,`Y` and facing `NORTH`, `SOUTH`, `EAST` or `WEST`.
<br/>
The origin `(0,0)` can be considered to be the `SOUTH WEST` most corner.
<br/>
It is required that the first command to the robot is a `PLACE` command, after that, any sequence of commands may be issued, in any order, including another `PLACE` command. The application should discard all commands in the sequence until a valid `PLACE` command has been executed.
<br/>
`MOVE` will move the toy robot one unit forward in the direction it is currently facing.
<br/>
`LEFT` and `RIGHT` will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
<br/>
`REPORT` will announce the `X`,`Y` and `F` of the robot. This can be in any form, but standard output is sufficient.
<br/>
A robot that is not on the table can choose to ignore the `MOVE`, `LEFT`, `RIGHT` and `REPORT` commands.

<br/>

## Installation

In the project directory, you can run:

### `yarn`

or

### `npm init`

<br/>
<br/>

### Running the app

In the project directory, you can run:

### `yarn start`

or

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Test the app

There are 10 predefined test scenarios. Additional test scenarios can be added to the [MainSecreen.test.js](./src/components/MainScreen/MainScreen.test.js) file.

| Test             | Scenerio                                                  |
| ---------------- | --------------------------------------------------------- |
| Test Scenario 1  | Test whether the robot is placed correctly or not         |
| Test Scenario 2  | Test whether the robot is moved to Top without any error. |
| Test Scenario 3  | Test whether the robot is falling from the table          |
| Test Scenario 4  | Test place the robot on a wrong unit on the table         |
| Test Scenario 5  | Test the turn left to whether is working correctly        |
| Test Scenario 6  | Test the turn right to whether is working correctly       |
| Test Scenario 7  | Test the turn right twice to whether is working correctly |
| Test Scenario 8  | Test the turn left twice to whether is working correctly  |
| Test Scenario 9  | Test the turn right and move to the end of the table      |
| Test Scenario 10 | Test the turn left and move to the end of the table       |

<br/>
<br/>

To execute the test, in the project directory, you can run:

### `yarn test`

or

### `npm run test`
