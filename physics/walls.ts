import Matter from "matter-js";
import world from "./world";

export const WALL_CATEGORY = 0x0001;
export const CARD_CATEGORY = 0x0002;

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
			collisionFilter: {
				category: WALL_CATEGORY,
			},
		}),

		// Bottom
		Matter.Bodies.rectangle(
			width / 2,
			height + thickness / 2,
			width,
			thickness,
			{
				isStatic: true,
				collisionFilter: {
					category: WALL_CATEGORY,
				},
			},
		),

		// Left
		Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, {
			isStatic: true,
			collisionFilter: {
				category: WALL_CATEGORY,
			},
		}),

		// Right
		Matter.Bodies.rectangle(
			width + thickness / 2,
			height / 2,
			thickness,
			height,
			{
				isStatic: true,
				collisionFilter: {
					category: WALL_CATEGORY,
				},
			},
		),
	];

	Matter.World.add(world, walls);
}
