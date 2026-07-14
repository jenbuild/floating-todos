import Matter from "matter-js";
import { CARD_CATEGORY, WALL_CATEGORY } from "./walls";
import world from "./world";

type PhysicsItem = {
	body: Matter.Body;
	zIndex: number;
	layer: number;
};

class PhysicsManager {
	private items = new Map<string, PhysicsItem>();

	createTodo(id: string, width = 200, height = 90) {
		const body = Matter.Bodies.rectangle(
			Math.random() * (window.innerWidth - 300) + 150,
			Math.random() * (window.innerHeight - 300) + 150,
			width,
			height,
			{
				restitution: 1,
				friction: 0,
				frictionAir: 0,
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
}

export default new PhysicsManager();
