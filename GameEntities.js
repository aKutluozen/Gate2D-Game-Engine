/**
 * @GameEntities.js 
 *
 * Initialization of all the game objects and variables must be done here using
 * Object's and Globals' add method.
 * 
 * @author          Ali Kutluozen
 */

'use strict';

/**
 * All the following added objects can be reached by Objects.<tagname>
 * E.g., GameObject.player 
 */
Objects.add([
    new Point(100, 200, 20, 20, 'point', 'cursor', true),
    new Ball(100, 100, 20, 20, 'ball', 'player'),
    new Box(0, 0, 50, 50, 'box1'),
    new Box(0, 0, 50, 50, 'box2'),
    new Box(0, 0, 50, 50, 'box3'),
    new Box(0, 0, 50, 50, 'box4'),
    new Box(0, 0, 50, 50, 'box5'),
    new Box(0, 0, 50, 50, 'box6'),
    new Box(0, 0, 50, 50, 'box7'),
    new Box(0, 0, 50, 50, 'box8'),
    new Box(0, 0, 50, 50, 'box9'),
    new Box(0, 0, 50, 50, 'box10'),
    new Box(0, 0, 50, 50, 'box11'),
    new Box(0, 0, 50, 50, 'box12'),
    new Box(0, 0, 50, 50, 'box13'),
    new Box(0, 0, 50, 50, 'box14'),
    new Box(0, 0, 50, 50, 'box15'),
    new Box(0, 0, 50, 50, 'box16'),
    new Box(0, 0, 50, 50, 'box17'),
    new Box(0, 0, 50, 50, 'box18'),
    // Instantiate custom game objects here
    // ...
]);

/**
 * All the following added variables can be reached by Globals.<varname>
 * E.g., Globals.score 
 */
Globals.add([
    {score: 0},
    {level: 0},
    
    // Create custom game variables here as name-value pairs
    // ...
]);

/**
 * All the following added levels can be reached by Levels.<varname>
 * E.g., Levels.intro1 
 */
Levels.add([
    {
        tag: 'level1',
        width: 640,
        height: 480,
        x: 0,
        y: 0,
        background: 'imgBackground',
        objectsList: [
            {name: 'point', x: 300, y: 300, z: 0},
            {name: 'ball', x: 300, y: 300, z: 0},    
            {name: 'box1', x: 10, y: 10, z: 2},
            {name: 'box2', x: 60, y: 10, z: 1},
            {name: 'box3', x: 110, y: 10, z: 0},
            {name: 'box4', x: 160, y: 10, z: 1},
            {name: 'box5', x: 210, y: 10, z: 1},
            {name: 'box6', x: 260, y: 10, z: 1},
            {name: 'box7', x: 310, y: 10, z: 1},
            {name: 'box8', x: 360, y: 10, z: 1},
            {name: 'box9', x: 10, y: 60, z: 1},
            {name: 'box10', x: 60, y: 60, z: 1},
            {name: 'box11', x: 110, y: 60, z: 1},
            {name: 'box12', x: 160, y: 60, z: 1},
            {name: 'box13', x: 210, y: 60, z: 1},
            {name: 'box14', x: 260, y: 60, z: 1},
            {name: 'box15', x: 310, y: 60, z: 1},
            {name: 'box16', x: 360, y: 60, z: 1},
            {name: 'box17', x: 410, y: 10, z: 1},
            {name: 'box18', x: 410, y: 60, z: 1},
        ]
    },
    {
        tag: 'level2',
        width: 500,
        height: 250,
        x: 0,
        y: 0,
        background: 'imgBackground2',
        objectsList: [
            {name: 'point', x: 0, y: 0}
        ]
    },
    // Create custom levels here
    // ...
]);
