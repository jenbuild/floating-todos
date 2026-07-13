export interface Todo {
	id: string;
	title: string;
	completed: boolean;
	createdAt: number;
	bodyId: string;

	x: number;
	y: number;
	rotation: number;
	width: number;
}
