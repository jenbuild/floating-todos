import AddTodoBar from "@/components/AddTodoBar";
import TodoCanvas from "@/components/TodoCanvas";

export default function Home() {
  return (
    <main className="relative h-screen overflow-hidden bg-neutral-50">
      <TodoCanvas />

      <AddTodoBar />
    </main>
  );
}