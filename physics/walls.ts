import Matter from "matter-js";
import world from "./world";

let walls: Matter.Body[] = [];

export function createWalls(width: number, height: number) {
	if (walls.length) {
		Matter.World.remove(world, walls);
	}

	const thickness = 100;

	walls = [
		// Top
		Matter.Bodies.rectangle(width / 2, -thickness / 2, width, thickness, {
			isStatic: true,
		}),

		// Bottom
		Matter.Bodies.rectangle(
			width / 2,
			height + thickness / 2,
			width,
			thickness,
			{ isStatic: true },
		),

		// Left
		Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
			isStatic: true,
		}),

		// Right
		Matter.Bodies.rectangle(
			width + thickness / 2,
			height / 2,
			thickness,
			height,
			{ isStatic: true },
		),
	];

	Matter.World.add(world, walls);
}
