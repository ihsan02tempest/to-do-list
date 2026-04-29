import { useState } from "react";
import { Trash2, GripVertical, Pencil, Check, X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

const priorityConfig = {
  low: { label: "Rendah", color: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20" },
  medium: { label: "Sedang", color: "bg-amber-500/15 text-amber-400 border-amber-500/20" },
  high: { label: "Tinggi", color: "bg-rose-500/15 text-rose-400 border-rose-500/20" },
};

const categoryConfig = {
  personal: { label: "Pribadi", emoji: "🏠" },
  work: { label: "Kerja", emoji: "💼" },
  shopping: { label: "Belanja", emoji: "🛒" },
  health: { label: "Kesehatan", emoji: "💪" },
  other: { label: "Lainnya", emoji: "📌" },
};

export function TodoItem({ todo, onToggle, onDelete, onEdit }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(todo.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") handleCancel();
  };

  const priority = priorityConfig[todo.priority];
  const category = categoryConfig[todo.category];

  return (
    <div
      className={cn(
        "group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300",
        "hover:bg-secondary/50 hover:border-border/80 hover:shadow-sm",
        todo.completed
          ? "bg-muted/30 border-border/30 opacity-60"
          : "bg-card border-border/50"
      )}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab" />

      <Checkbox
        id={`todo-${todo.id}`}
        checked={todo.completed}
        onCheckedChange={() => onToggle(todo.id)}
        className={cn(
          "h-5 w-5 rounded-full border-2 transition-all duration-200",
          todo.completed
            ? "border-primary bg-primary"
            : "border-muted-foreground/30 hover:border-primary/60"
        )}
      />

      {isEditing ? (
        <div className="flex-1 flex items-center gap-2">
          <Input
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-8 text-sm bg-secondary/50"
            autoFocus
          />
          <Button size="icon" variant="ghost" onClick={handleSave} className="h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10">
            <Check className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost" onClick={handleCancel} className="h-8 w-8 text-muted-foreground hover:text-foreground">
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="flex-1 min-w-0">
          <p
            className={cn(
              "text-sm font-medium truncate transition-all duration-300",
              todo.completed
                ? "line-through text-muted-foreground"
                : "text-foreground"
            )}
          >
            {todo.text}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="outline"
              className={cn("text-[10px] h-5 px-2 font-medium border", priority.color)}
            >
              {priority.label}
            </Badge>
            <span className="text-[10px] text-muted-foreground/60">
              {category.emoji} {category.label}
            </span>
            <span className="text-[10px] text-muted-foreground/40">
              {new Date(todo.createdAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </div>
      )}

      {!isEditing && (
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <Pencil className="h-3.5 w-3.5" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => onDelete(todo.id)}
            className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      )}
    </div>
  );
}
