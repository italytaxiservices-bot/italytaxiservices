import { getDocumentDownloadUrl } from "@/lib/admin/actions/documents";
import { formatDate } from "@/lib/admin/format";

type Doc = {
  id: string;
  file_name: string;
  document_subtype: string | null;
  doc_type: string;
  expiry_date: string | null;
  storage_path: string;
};

function expiryStatus(expiryDate: string | null): { label: string; tone: string } | null {
  if (!expiryDate) return null;
  const days = Math.floor((new Date(expiryDate).getTime() - Date.now()) / 86_400_000);
  if (days < 0) return { label: "EXPIRED", tone: "bg-red-50 text-red-700 border-red-200" };
  if (days <= 30) return { label: "EXPIRING SOON", tone: "bg-amber-50 text-amber-800 border-amber-200" };
  return { label: "VALID", tone: "bg-emerald-50 text-emerald-700 border-emerald-200" };
}

/** Lists a driver/vehicle's uploaded documents with expiry status. Signed
 * download links are generated server-side on render (60s TTL) — private
 * bucket, never a public URL. */
export async function DocumentExpiryList({ documents }: { documents: Doc[] }) {
  if (documents.length === 0) {
    return <p className="text-xs text-admin-stone">No documents uploaded yet.</p>;
  }

  const withUrls = await Promise.all(
    documents.map(async (d) => ({
      ...d,
      url: await getDocumentDownloadUrl(d.storage_path).catch(() => null),
    }))
  );

  return (
    <ul className="space-y-2">
      {withUrls.map((d) => {
        const status = expiryStatus(d.expiry_date);
        return (
          <li key={d.id} className="flex items-start justify-between gap-2 text-xs border-b border-admin-line pb-2 last:border-0 last:pb-0">
            <div className="min-w-0">
              {d.url ? (
                <a href={d.url} target="_blank" rel="noreferrer" className="text-admin-ink font-medium hover:underline truncate block">
                  {d.document_subtype || d.file_name}
                </a>
              ) : (
                <span className="text-admin-ink font-medium truncate block">{d.document_subtype || d.file_name}</span>
              )}
              {d.expiry_date ? <span className="text-admin-stone">Expires {formatDate(d.expiry_date)}</span> : null}
            </div>
            {status ? <span className={`shrink-0 px-1.5 py-0.5 rounded-sm border ${status.tone}`}>{status.label}</span> : null}
          </li>
        );
      })}
    </ul>
  );
}
