import Matter from "matter-js";
import world from "./world";

class PhysicsManager {
	private bodies = new Map<string, Matter.Body>();

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
			},
		);

		Matter.World.add(world, body);

		Matter.Body.setVelocity(body, {
			x: (Math.random() - 0.5) * 6,
			y: (Math.random() - 0.5) * 6,
		});

		this.bodies.set(id, body);
	}

	getBody(id: string) {
		return this.bodies.get(id);
	}

	removeTodo(id: string) {
		const body = this.bodies.get(id);

		if (!body) return;

		Matter.World.remove(world, body);

		this.bodies.delete(id);
	}
}

export default new PhysicsManager();
