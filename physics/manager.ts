import Matter from "matter-js";
import { CARD_CATEGORY, WALL_CATEGORY } from "./walls";
import world from "./world";

type PhysicsItem = {
	body: Matter.Body;
	zIndex: number;
	layer: number;

	nextImpulse: number;
};

function randomBetween(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

class PhysicsManager {
	private items = new Map<string, PhysicsItem>();

	createTodo(id: string, width = 200, height = 90) {
		const body = Matter.Bodies.rectangle(
			Math.random() * (window.innerWidth - 300) + 150,
			Math.random() * (window.innerHeight - 300) + 150,
			width,
			height,
			{
				restitution: 0.65,
				friction: 0,
				frictionAir: 0.015,
				collisionFilter: {
					category: CARD_CATEGORY,
					mask: WALL_CATEGORY,
				},
			},
		);

		const layer = Math.floor(Math.random() * 5) + 1;

		const zIndex = layer * 10;

		this.items.set(id, {
			body,
			layer,
			zIndex,

			nextImpulse: performance.now() + randomBetween(2000, 7000),
		});

		Matter.World.add(world, body);

		Matter.Body.setVelocity(body, {
			x: (Math.random() - 0.5) * 6,
			y: (Math.random() - 0.5) * 6,
		});
	}

	getBody(id: string) {
		return this.items.get(id)?.body;
	}

	getItem(id: string) {
		return this.items.get(id);
	}

	getZIndex(id: string) {
		return this.items.get(id)?.zIndex ?? 1;
	}

	removeTodo(id: string) {
		const item = this.items.get(id);

		if (!item) return;

		Matter.World.remove(world, item.body);

		this.items.delete(id);
	}

	update() {
		const now = performance.now();

		this.items.forEach((item) => {
			if (now < item.nextImpulse) {
				return;
			}

			Matter.Body.applyForce(item.body, item.body.position, {
				x: (Math.random() - 0.5) * 0.03,
				y: (Math.random() - 0.5) * 0.03,
			});

			item.nextImpulse = now + randomBetween(3000, 7000);
		});
	}
}

export default new PhysicsManager();
