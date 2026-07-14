"use client";

import engine from "@/physics/engine";
import { createWalls } from "@/physics/walls";

import physicsManager from '@/physics/manager';
import physicsRenderer from '@/physics/renderer';
import Matter from "matter-js";
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

        window.addEventListener("resize", handleResize);

        let animationFrame: number;
        const animate = () => {

            physicsRenderer.getElements().forEach((element, id) => {

                const body = physicsManager.getBody(id);

                if (!body) return;

                element.style.transform = `
                translate(${body.position.x}px,${body.position.y}px)
                translate(-50%,-50%)
                rotate(${body.angle}rad)
            `;

            });

            animationFrame = requestAnimationFrame(animate);

        };

        animate();

        return () => {
            Matter.Runner.stop(runner);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrame);
        }
    }, []);

    return null;
}

export default PhysicsCanvas