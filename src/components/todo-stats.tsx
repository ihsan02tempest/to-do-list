import { CheckCircle2, Clock, Flame, TrendingUp } from "lucide-react";
import type { Todo } from "@/types/todo";

interface TodoStatsProps {
  todos: Todo[];
}

export function TodoStats({ todos }: TodoStatsProps) {
  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const active = total - completed;
  const highPriority = todos.filter((t) => t.priority === "high" && !t.completed).length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const stats = [
    {
      label: "Total",
      value: total,
      icon: TrendingUp,
      gradient: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
    },
    {
      label: "Aktif",
      value: active,
      icon: Clock,
      gradient: "from-amber-500/20 to-orange-500/20",
      iconColor: "text-amber-400",
    },
    {
      label: "Selesai",
      value: completed,
      icon: CheckCircle2,
      gradient: "from-emerald-500/20 to-green-500/20",
      iconColor: "text-emerald-400",
    },
    {
      label: "Prioritas",
      value: highPriority,
      icon: Flame,
      gradient: "from-rose-500/20 to-pink-500/20",
      iconColor: "text-rose-400",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${stat.gradient} p-3 border border-border/30`}
            >
              <Icon className={`h-4 w-4 ${stat.iconColor} mb-1`} />
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-xs font-semibold text-foreground">{percentage}%</span>
        </div>
        <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary/80 to-primary transition-all duration-700 ease-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
