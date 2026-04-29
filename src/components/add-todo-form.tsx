import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Priority, Category } from "@/types/todo";

interface AddTodoFormProps {
  onAdd: (text: string, priority: Priority, category: Category) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [category, setCategory] = useState<Category>("personal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim(), priority, category);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          id="todo-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Apa yang ingin kamu lakukan?"
          className="flex-1 h-12 bg-secondary/50 border-border/50 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-primary/30 transition-all duration-200"
        />
        <Button
          type="submit"
          size="lg"
          id="add-todo-btn"
          disabled={!text.trim()}
          className="h-12 px-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 disabled:opacity-40 disabled:shadow-none"
        >
          <Plus className="h-5 w-5 mr-1" />
          Tambah
        </Button>
      </div>
      <div className="flex gap-2">
        <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
          <SelectTrigger className="w-[140px] h-9 text-xs bg-secondary/30 border-border/30">
            <SelectValue placeholder="Prioritas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">🟢 Rendah</SelectItem>
            <SelectItem value="medium">🟡 Sedang</SelectItem>
            <SelectItem value="high">🔴 Tinggi</SelectItem>
          </SelectContent>
        </Select>
        <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
          <SelectTrigger className="w-[140px] h-9 text-xs bg-secondary/30 border-border/30">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="personal">🏠 Pribadi</SelectItem>
            <SelectItem value="work">💼 Kerja</SelectItem>
            <SelectItem value="shopping">🛒 Belanja</SelectItem>
            <SelectItem value="health">💪 Kesehatan</SelectItem>
            <SelectItem value="other">📌 Lainnya</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </form>
  );
}
