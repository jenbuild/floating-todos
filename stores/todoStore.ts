import { Todo } from "@/types/todo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoStore {
	todos: Todo[];

	addTodo: (title: string) => void;
}

export const useTodoStore = create<TodoStore>()(
	persist(
		(set) => ({
			todos: [],
			addTodo: (title) =>
				set((state) => ({
					todos: [
						...state.todos,
						{
							id: crypto.randomUUID(),
							bodyId: crypto.randomUUID(),
							title,
							completed: false,
							createdAt: Date.now(),
						},
					],
				})),
		}),
		{
			name: "floating-todos",
		},
	),
);
