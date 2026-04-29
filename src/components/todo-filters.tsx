import { ListFilter, CheckCircle2, Circle, LayoutList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { FilterType } from "@/types/todo";

interface TodoFiltersProps {
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: { all: number; active: number; completed: number };
}

const filters: { value: FilterType; label: string; icon: React.ElementType }[] = [
  { value: "all", label: "Semua", icon: LayoutList },
  { value: "active", label: "Aktif", icon: Circle },
  { value: "completed", label: "Selesai", icon: CheckCircle2 },
];

export function TodoFilters({ filter, onFilterChange, counts }: TodoFiltersProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-secondary/30 rounded-lg">
      <ListFilter className="h-4 w-4 text-muted-foreground/50 mx-2" />
      {filters.map((f) => {
        const Icon = f.icon;
        const count = counts[f.value];
        return (
          <Button
            key={f.value}
            variant="ghost"
            size="sm"
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "h-8 px-3 text-xs font-medium transition-all duration-200 gap-1.5",
              filter === f.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {f.label}
            <span
              className={cn(
                "ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full",
                filter === f.value
                  ? "bg-primary/10 text-primary"
                  : "bg-muted text-muted-foreground"
              )}
            >
              {count}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
