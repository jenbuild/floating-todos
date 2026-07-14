import Matter from "matter-js";
import world from "./world";

let box: Matter.Body | null = null;

export function createTestBox() {
	if (box) return box;

	box = Matter.Bodies.rectangle(300, 300, 120, 80, {
		restitution: 1,
		friction: 0,
		frictionAir: 0,
		inertia: Infinity, // Prevent rotation for now
	});

	Matter.World.add(world, box);

	Matter.Body.setVelocity(box, {
		x: 8,
		y: 6,
	});

	return box;
}

export function getTestBox() {
	return box;
}
