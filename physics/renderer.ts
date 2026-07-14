class PhysicsRenderer {
	private elements = new Map<string, HTMLDivElement>();

	register(id: string, element: HTMLDivElement) {
		this.elements.set(id, element);
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
