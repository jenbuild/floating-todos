"use client";

import engine from "@/physics/engine";
import { createWalls } from "@/physics/walls";

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

        return () => {
            Matter.Runner.stop(runner);
            window.removeEventListener("resize", handleResize);
        }
    }, []);

    return null;
}

export default PhysicsCanvas