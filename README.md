# JS-Game-Boilerplate

A basic JavaScript game engine/boilerplate.

This is an ongoing side project of mine in which I bring together some of the functions I use the most.

# Basic Usage:

Creating game objects:
- Create an <object-name>.js file containing the main logic for that specific object. (Make sure the object has both draw and update methods!)
- Add the file to the Bootstrap.js by using the Loader.enqueue() function.
- Instantiate the object in GameEntities.js by using Objects.add() function. (All these objects can be reached by Objects.objectName)
Your object should be ready to go!
