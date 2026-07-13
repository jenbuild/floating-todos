import { Todo } from "@/types/todo";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TodoStore {
	todos: Todo[];

	addTodo: (title: string) => void;
	toggleTodo: (id: string) => void;
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

							x: Math.random() * (window.innerWidth - 260),
							y: Math.random() * (window.innerHeight - 250),
							rotation: Math.random() * 30 - 15,
							width: 220 + Math.random() * 60,
						},
					],
				})),

			toggleTodo: (id) =>
				set((state) => ({
					todos: state.todos.map((todo) =>
						todo.id === id
							? { ...todo, completed: !todo.completed }
							: todo,
					),
				})),
		}),
		{
			name: "floating-todos",
		},
	),
);
