import { Body, Constraint, Vector, World } from "matter-js";

import world from "./world";

class DragManager {
	private body: Body | null = null;
	private constraint: Constraint | null = null;

	start(body: Body, mouse: Vector) {
		this.stop();

		this.body = body;

		this.constraint = Constraint.create({
			pointA: mouse,
			bodyB: body,
			pointB: {
				x: mouse.x - body.position.x,
				y: mouse.y - body.position.y,
			},
			stiffness: 0.15,
			damping: 0.1,
		});

		World.add(world, this.constraint);
	}

	move(mouse: Vector) {
		if (!this.constraint) return;

		this.constraint.pointA = mouse;
	}

	stop() {
		if (this.constraint) {
			World.remove(world, this.constraint);
		}

		this.constraint = null;
		this.body = null;
	}

	isDragging() {
		return this.body !== null;
	}
}

export default new DragManager();
