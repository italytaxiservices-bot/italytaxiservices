import { addInternalNote } from "@/lib/admin/actions/notes";
import { createClient } from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/admin/format";

type EntityType = "customer" | "booking" | "driver" | "vehicle" | "invoice" | "lead";

/** Staff-only, never queried from any customer-portal page or get_my_*
 * function — see internal_notes RLS (no policy exists for the customer
 * identity at all). Safe to mount on any admin detail page. */
export async function InternalNotes({ entityType, entityId }: { entityType: EntityType; entityId: string }) {
  const supabase = await createClient();
  const { data: notes } = await supabase
    .from("internal_notes")
    .select("id, note, created_at, profiles(full_name)")
    .eq("entity_type", entityType)
    .eq("entity_id", entityId)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-3">
      <form action={addInternalNote.bind(null, entityType, entityId)} className="space-y-2">
        <textarea name="note" required rows={2} placeholder="Add an internal note — staff only, never shown to the customer" className="input-luxe text-sm" />
        <button type="submit" className="text-xs border border-admin-line px-3 py-1.5 rounded-sm hover:bg-admin-ivory-deep">
          Add note
        </button>
      </form>
      {notes && notes.length > 0 ? (
        <ul className="space-y-2 max-h-64 overflow-y-auto">
          {notes.map((n) => (
            <li key={n.id} className="text-xs border-t border-admin-line pt-2">
              <p className="text-admin-ink whitespace-pre-wrap">{n.note}</p>
              <p className="text-admin-stone mt-1">
                {n.profiles?.full_name ?? "Unknown"} · {formatDateTime(n.created_at)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-xs text-admin-stone">No internal notes yet.</p>
      )}
    </div>
  );
}
