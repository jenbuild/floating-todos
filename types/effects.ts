export interface EmojiParticle {
	id: string;
	emoji: string;

	x: number;
	y: number;

	// dx: number;
	startX: number;
	startY: number;
	endX: number;
	travel: number;
	rotation: number;
	duration: number;

	size: number;
}
