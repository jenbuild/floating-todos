
// interface EmojiParticle {
//     id: string;
//     emoji: string;
//     x: number;
//     y: number;
//     dx: number;
//     rotation: number;
//     size: number;
// }

import { EmojiParticle } from "@/types/effects";

interface Props {
    particles: EmojiParticle[];
}

const EmojiBurst = ({ particles }: Props) => {
    return (
        <>
            {particles.map((p) => (
                <span
                    key={p.id}
                    className="pointer-events-none fixed animate-emoji"
                    style={{
                        left: p.x,
                        top: p.y,
                        fontSize: p.size,
                        transform: `translateX(-50%)`,
                        animationDuration: `${p.duration}ms`,
                        // ["--dx" as any]: `${p.dx}px`,
                        // ["--rotation" as any]: `${p.rotation}deg`,
                        ["--start-x" as any]: `${p.startX}px`,
                        ["--start-y" as any]: `${p.startY}px`,
                        ["--end-x" as any]: `${p.endX}px`,
                        ["--travel" as any]: `${p.travel}px`,
                        ["--rotation" as any]: `${p.rotation}deg`,
                        zIndex: 9999,
                    }}
                >
                    {p.emoji}
                </span>
            ))}
        </>
    )
}

export default EmojiBurst