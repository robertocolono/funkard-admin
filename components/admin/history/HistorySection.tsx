"use client";
import { useHistory } from "./useHistory";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface Props {
  type: string;
  targetId: number;
}

export default function HistorySection({ type, targetId }: Props) {
  const { history, loading } = useHistory(type, targetId);

  return (
    <Card className="p-4 mt-4 border rounded-xl">
      <h3 className="text-sm font-semibold mb-2">Storico azioni</h3>

      {loading ? (
        <div className="flex items-center gap-2 text-gray-500 text-xs">
          <Loader2 className="w-4 h-4 animate-spin" /> Caricamento storico...
        </div>
      ) : history.length === 0 ? (
        <p className="text-xs text-gray-500">Nessuna azione registrata.</p>
      ) : (
        <ul className="space-y-1 text-xs">
          {history.map((a, i) => (
            <li key={i} className="text-gray-700 border-b border-gray-100 pb-1 last:border-0">
              <b>{a.performedBy}</b> ({a.role}) → <span className="font-medium">{a.action}</span>
              {a.notes ? ` — ${a.notes}` : ""}
              <br />
              <span className="text-[10px] text-gray-400">{new Date(a.createdAt).toLocaleString()}</span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
