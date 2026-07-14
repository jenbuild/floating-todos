"use client";

import engine from "@/physics/engine";
import { createWalls } from "@/physics/walls";

import dragManager from "@/physics/drag";
import physicsManager from '@/physics/manager';
import physicsRenderer from '@/physics/renderer';
import Matter, { Vector } from "matter-js";
import { useEffect } from "react";

const PhysicsCanvas = () => {
    useEffect(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        createWalls(width, height);

        const runner = Matter.Runner.create();

        Matter.Runner.run(runner, engine);

        const handleResize = () => {
            createWalls(window.innerWidth, window.innerHeight);
        }

        const handlePointerDown = (e: PointerEvent) => {
            const card = getTodoElement(e.target);

            if (!card) return;

            const id = card.getAttribute("data-todo-id");

            if (!id) return;

            const body = physicsManager.getBody(id);

            if (!body) return;

            dragManager.start(body, Vector.create(e.clientX, e.clientY));
        };

        const handlePointerMove = (e: PointerEvent) => {
            if (!dragManager.isDragging()) return;

            dragManager.move(
                Vector.create(e.clientX, e.clientY)
            );
        };

        const handlePointerUp = () => {
            dragManager.stop();
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        let animationFrame: number;
        const animate = () => {

            physicsRenderer.getElements().forEach((element, id) => {

                const body = physicsManager.getBody(id);

                if (!body) return;

                element.element.style.transform = `
                translate(${body.position.x}px,${body.position.y}px)
                translate(-50%,-50%)
                rotate(${body.angle}rad)
            `;

            });

            animationFrame = requestAnimationFrame(animate);

        };

        animate();

        const getTodoElement = (target: EventTarget | null) => {
            if (!(target instanceof HTMLElement)) return null;

            return target.closest("[data-todo-id]");
        }

        return () => {
            Matter.Runner.stop(runner);
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
            cancelAnimationFrame(animationFrame);
        }
    }, []);

    return null;
}

export default PhysicsCanvas