type RenderItem = {
	id: string;
	element: HTMLDivElement;
};

class PhysicsRenderer {
	private elements = new Map<string, RenderItem>();

	register(id: string, element: HTMLDivElement) {
		this.elements.set(id, { id, element });
	}

	unregister(id: string) {
		this.elements.delete(id);
	}

	getElement(id: string) {
		return this.elements.get(id);
	}

	getElements() {
		return this.elements;
	}
}

export default new PhysicsRenderer();
