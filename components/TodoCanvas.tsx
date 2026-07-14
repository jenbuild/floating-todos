"use client";

import physicsManager from "@/physics/manager";
import { useTodoStore } from "@/stores/todoStore";
import { useEffect, useRef } from "react";
import TodoCard from "./TodoCard";

const TodoCanvas = () => {
    const todos = useTodoStore((state) => state.todos);

    const previousIds = useRef(new Set<string>());

    useEffect(() => {
        const currentIds = new Set(todos.map((todo) => todo.id));

        todos.forEach((todo) => {
            if (!physicsManager.getBody(todo.id)) {
                physicsManager.createTodo(todo.id, 260, 90);
            }
        });

        previousIds.current.forEach((id) => {
            if (!currentIds.has(id)) {
                physicsManager.removeTodo(id);
            }
        })

        previousIds.current = currentIds;
    }, [todos]);

    return (
        <>
            {todos.map((todo) => (
                <TodoCard
                    key={todo.id}
                    todo={todo}
                />
            ))}
        </>
    )
}

export default TodoCanvas