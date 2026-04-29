import { useMemo } from "react";
import { Sparkles } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { AddTodoForm } from "@/components/add-todo-form";
import { TodoItem } from "@/components/todo-item";
import { TodoFilters } from "@/components/todo-filters";
import { TodoStats } from "@/components/todo-stats";
import { ThemeToggle } from "@/components/theme-toggle";
import { EmptyState } from "@/components/empty-state";
import { ClearCompleted } from "@/components/clear-completed";
import type { Todo, Priority, Category, FilterType } from "@/types/todo";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const [filter, setFilter] = useLocalStorage<FilterType>("todo-filter", "all");

  const addTodo = (text: string, priority: Priority, category: Category) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      priority,
      category,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedAt: !todo.completed ? Date.now() : undefined,
            }
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = useMemo(() => {
    switch (filter) {
      case "active":
        return todos.filter((t) => !t.completed);
      case "completed":
        return todos.filter((t) => t.completed);
      default:
        return todos;
    }
  }, [todos, filter]);

  // Sort: incomplete first (high → medium → low), then completed
  const sortedTodos = useMemo(() => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return [...filteredTodos].sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      if (!a.completed && !b.completed) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return (b.completedAt ?? 0) - (a.completedAt ?? 0);
    });
  }, [filteredTodos]);

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.12),rgba(255,255,255,0))]" />

      <div className="relative max-w-2xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/80 to-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Sparkles className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">
                TaskFlow
              </h1>
              <p className="text-[11px] text-muted-foreground font-medium">
                Kelola tugasmu dengan mudah
              </p>
            </div>
          </div>
          <ThemeToggle />
        </header>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mb-6 animate-in fade-in slide-in-from-top-2 duration-500">
            <TodoStats todos={todos} />
          </div>
        )}

        {/* Add Todo Form */}
        <div className="mb-6">
          <AddTodoForm onAdd={addTodo} />
        </div>

        <Separator className="mb-6 bg-border/30" />

        {/* Filters & Actions */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <TodoFilters filter={filter} onFilterChange={setFilter} counts={counts} />
          <ClearCompleted count={counts.completed} onClear={clearCompleted} />
        </div>

        {/* Todo List */}
        <div className="space-y-2">
          {sortedTodos.length === 0 ? (
            <EmptyState />
          ) : (
            sortedTodos.map((todo) => (
              <div
                key={todo.id}
                className="animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                <TodoItem
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-xs text-muted-foreground/40">
            Built with shadcn/ui & React • Data tersimpan di browser
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
