import { useTodoStore } from "@/stores/todoStore";
import { Todo } from "@/types/todo";

interface TodoCardProps {
    todo: Todo;
}

const TodoCard = ({ todo }: TodoCardProps) => {
    const toggleTodo = useTodoStore((state) => state.toggleTodo);

    return (
        <div
            className="absolute w-64 rounded-2xl bg-white py-3 px-4 shadow-xl border border-neutral-200 select-none"
            style={{
                left: todo.x,
                top: todo.y,
                transform: `rotate(${todo.rotation}deg)`,
                width: todo.width
            }}
        >
            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 cursor-pointer"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
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
    )
}

export default TodoCard