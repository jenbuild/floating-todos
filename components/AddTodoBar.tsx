"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

const AddTodoBar = () => {
    const [title, setTitle] = useState("");

    return (
        <div className="fixed inset-x-0 bottom-8 z-[9999] flex justify-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-white shadow-xl border border-neutral-200 p-2">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Add a todo..."
                    className="w-72 bg-white px-4 py-2 outline-none"
                />
                <button
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition hover:scale-105 active:scale-95"
                >
                    <Plus size={20} />
                </button>
            </div></div>
    )
}

export default AddTodoBar