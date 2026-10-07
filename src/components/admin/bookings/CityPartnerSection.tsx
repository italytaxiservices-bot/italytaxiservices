import { Section } from "@/components/admin/ui/Section";
import { PartnerList } from "@/components/admin/bookings/PartnerCard";
import { QuickDriverSend } from "@/components/admin/bookings/QuickDriverSend";
import { CITY_LABELS, tripCity } from "@/lib/admin/cities";
import { partnerOption, partnersFor } from "@/lib/admin/cityDrivers";

/**
 * On a booking/lead detail page: if the trip is in a city a partner company
 * covers (e.g. Bari / Puglia), show the partner up front with one-click
 * WhatsApp / email of the trip summary. Renders nothing otherwise.
 */
export function CityPartnerSection({
  pickup,
  dropoff,
  text,
  entityType,
  entityId,
  sentLabel,
}: {
  pickup: string | null;
  dropoff: string | null;
  text: string;
  entityType: "booking" | "lead";
  entityId: string;
  sentLabel?: string | null;
}) {
  const city = tripCity(pickup, dropoff);
  const partners = partnersFor(city);
  if (partners.length === 0) return null;
  const options = partners.map(partnerOption);

  return (
    <Section title={`Driver / partner for ${CITY_LABELS[city]}`}>
      <div className="p-4 space-y-2">
        <PartnerList partners={partners} cityLabel={CITY_LABELS[city]} />
        <QuickDriverSend text={text} entityType={entityType} entityId={entityId} drivers={options} defaultDriverId={options[0].id} sentLabel={sentLabel} />
      </div>
    </Section>
  );
}
