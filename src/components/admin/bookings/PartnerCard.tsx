import type { CityPartner } from "@/lib/admin/cityDrivers";

/**
 * All of a city's drivers/partners: the default (first) one in full, the
 * rest behind a toggle so a long list (Florence has 9) doesn't push the
 * trips off screen.
 */
export function PartnerList({ partners, cityLabel }: { partners: CityPartner[]; cityLabel: string }) {
  if (partners.length === 0) return null;
  const [first, ...rest] = partners;
  return (
    <div className="space-y-1.5">
      <PartnerCard partner={first} cityLabel={cityLabel} />
      {rest.length > 0 ? (
        <details className="text-xs">
          <summary className="cursor-pointer select-none text-sky-800 hover:underline">
            Show all {partners.length} drivers / partners for {cityLabel}
          </summary>
          <div className="mt-1.5 space-y-1.5">
            {rest.map((p) => (
              <PartnerCard key={p.slug} partner={p} cityLabel={cityLabel} />
            ))}
          </div>
        </details>
      ) : null}
    </div>
  );
}

/** Contact card for an outside driver or partner company that covers a city for us. */
export function PartnerCard({ partner, cityLabel }: { partner: CityPartner; cityLabel: string }) {
  const isDriver = partner.kind === "driver";
  return (
    <div className="rounded-sm border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-900 space-y-0.5">
      <p className="font-semibold">
        {isDriver ? "🚘" : "🤝"} {partner.name} <span className="font-normal">· {isDriver ? "driver" : "partner"} for {cityLabel}</span>
      </p>
      <p>{partner.description}</p>
      <p className="flex flex-wrap gap-x-3">
        <a href={`tel:${partner.phone.replace(/\s/g, "")}`} className="underline">
          📞 {partner.phone}
        </a>
        {partner.email ? (
          <a href={`mailto:${partner.email}`} className="underline">
            ✉️ {partner.email}
          </a>
        ) : null}
        {partner.website ? (
          <a href={partner.website} target="_blank" rel="noreferrer" className="underline">
            🌐 {partner.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
          </a>
        ) : null}
      </p>
    </div>
  );
}
