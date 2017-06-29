# JS-Game-Boilerplate

A basic JavaScript game engine/boilerplate.

This is an ongoing side project of mine in which I bring together some of the functions I use the most.

# Basic Usage:

- Create an object file containing the main logic for that specific object.
- Add the file to the Bootstrap.js by using the Loader.enqueue() function.
- Instantiate the object in Objects.js by using GameObjects.add() function. (All these objects can be reached by GameObjects.objectName)
- Any global variables must be declared in Globals.js. (Global variables can be reached via Globals.varName)
