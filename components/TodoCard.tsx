"use client";

import { celebrationEmojis } from "@/lib/emoji";
import physicsRenderer from "@/physics/renderer";
import { useTodoStore } from "@/stores/todoStore";
import { EmojiParticle } from "@/types/effects";
import { Todo } from "@/types/todo";
import { useEffect, useRef, useState } from "react";
import EmojiBurst from "./EmojiBurst";

interface TodoCardProps {
    todo: Todo;
}

const TodoCard = ({ todo }: TodoCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const checkboxRef = useRef<HTMLInputElement>(null);
    const [particles, setParticles] = useState<EmojiParticle[]>([]);

    const toggleTodo = useTodoStore((state) => state.toggleTodo);

    const handleToggle = () => {
        if (!todo.completed && checkboxRef.current) {
            const rect = checkboxRef.current.getBoundingClientRect();

            const checkboxX = rect.left + rect.width / 2;
            const checkboxY = rect.top + rect.height / 2;

            const count = Math.floor(Math.random() * 4) + 1;

            const radius = 18;

            const angle = Math.random() * Math.PI * 2;
            const distance = Math.random() * radius;

            const newParticles: EmojiParticle[] = Array.from(
                { length: count },
                () => ({
                    id: crypto.randomUUID(),
                    emoji:
                        celebrationEmojis[
                        Math.floor(Math.random() * celebrationEmojis.length)
                        ],

                    x: checkboxX + Math.cos(angle) * distance,
                    y: checkboxY + Math.sin(angle) * distance,
                    startX: Math.random() * 20 - 10,

                    startY: Math.random() * 20 - 10,

                    endX: Math.random() * 250 - 125,

                    travel: window.innerHeight + 100,
                    duration: 900 + Math.random() * 300,

                    rotation: Math.random() * 120 - 60,
                    size: 18 + Math.random() * 12,
                }));

            setParticles(newParticles);

            setTimeout(() => {
                setParticles([]);
            }, 900)
        }

        toggleTodo(todo.id)
    }

    useEffect(() => {
        if (ref.current) {
            physicsRenderer.register(todo.id, ref.current);
        }

        return () => {
            physicsRenderer.unregister(todo.id);
        }
    }, [todo.id])

    return (
        <>
            <div
                ref={ref}
                data-todo-id={todo.id}
                className="absolute w-64 rounded-2xl bg-white py-3 px-4 shadow-xl border border-neutral-200 select-none touch-none cursor-grab active:cursor-grabbing"
                style={{

                    width: todo.width
                }}
            >
                <div className="flex items-center gap-2">
                    <input
                        ref={checkboxRef}
                        type="checkbox"
                        className="mt-1 h-4 w-4 cursor-pointer"
                        checked={todo.completed}
                        onChange={handleToggle}
                    />

                    <div>
                        <p className={`text-md font-semibold break-words mt-0 ${todo.completed
                            ? "text-neutral-400 line-through"
                            : "text-neutral-900"
                            }`}>
                            {todo.title}
                        </p>
                        <p className="text-sm mt-0">
                            {new Date(todo.createdAt).toLocaleTimeString('en-US', {
                                hour: "2-digit", minute: "2-digit"
                            })}
                        </p>
                    </div>
                </div>
            </div>

            <EmojiBurst particles={particles} />
        </>
    )
}

export default TodoCard