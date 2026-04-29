import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ClearCompletedProps {
  count: number;
  onClear: () => void;
}

export function ClearCompleted({ count, onClear }: ClearCompletedProps) {
  const [open, setOpen] = useState(false);

  if (count === 0) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
          />
        }
      >
        <Trash2 className="h-3.5 w-3.5 mr-1.5" />
        Hapus selesai ({count})
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px]">
        <DialogHeader>
          <DialogTitle>Hapus tugas selesai?</DialogTitle>
          <DialogDescription>
            {count} tugas yang sudah selesai akan dihapus secara permanen. Tindakan ini tidak bisa dibatalkan.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} className="text-sm">
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onClear();
              setOpen(false);
            }}
            className="text-sm"
          >
            Hapus Semua
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
