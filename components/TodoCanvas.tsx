"use client";

import { useTodoStore } from "@/stores/todoStore";
import TodoCard from "./TodoCard";

const TodoCanvas = () => {
    const todos = useTodoStore((state) => state.todos);

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