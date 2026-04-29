import { ClipboardList } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-2xl scale-150" />
        <div className="relative bg-secondary/50 rounded-2xl p-6 border border-border/30">
          <ClipboardList className="h-12 w-12 text-muted-foreground/40" />
        </div>
      </div>
      <h3 className="mt-6 text-lg font-semibold text-foreground">
        Belum ada tugas
      </h3>
      <p className="mt-2 text-sm text-muted-foreground text-center max-w-[250px]">
        Mulai tambahkan tugas pertamamu dan kelola hari dengan lebih produktif!
      </p>
    </div>
  );
}
