"use client";

import { useTodoStore } from "@/stores/todoStore";
import { Plus } from "lucide-react";
import { useState } from "react";

const AddTodoBar = () => {
    const [title, setTitle] = useState("");

    const addTodo = useTodoStore((state) => state.addTodo);

    const handleAdd = () => {
        const trimmed = title.trim();

        if (!trimmed) return;

        addTodo(trimmed)
        setTitle("");
    }

    return (
        <div className="fixed inset-x-0 bottom-8 z-[9999] flex justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white/70 shadow-2xl border border-white/40 p-2 backdrop-blur-xl">
                <input
                    type="text"
                    placeholder="Add a todo..."
                    className="w-72 bg-transparent px-4 py-2 text-[15px] placeholder:text-neutral-400 outline-none"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") handleAdd();
                    }}
                />
                <button
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-200 hover:scale-105 active:scale-95"
                    onClick={handleAdd}
                >
                    <Plus size={20} />
                </button>
            </div></div>
    )
}

export default AddTodoBar