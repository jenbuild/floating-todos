import Matter from "matter-js";

const engine = Matter.Engine.create();

engine.gravity.y = 0;

export default engine;
