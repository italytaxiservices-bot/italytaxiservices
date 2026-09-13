import { Document, Page, View, Text, Image, StyleSheet } from "@react-pdf/renderer";
import type { CompanySettings } from "@/lib/pdf/company";

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#12161f" },
  headerRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 24 },
  logo: { maxWidth: 140, maxHeight: 48, marginBottom: 8, objectFit: "contain" },
  companyName: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 4 },
  companyLine: { color: "#6f6a60", marginBottom: 1 },
  docTitle: { fontSize: 18, fontFamily: "Helvetica-Bold", textAlign: "right" },
  docNumber: { color: "#6f6a60", textAlign: "right", marginTop: 2 },
  statusBadge: { marginTop: 6, alignSelf: "flex-end", backgroundColor: "#e9dcbf", color: "#8a6329", paddingVertical: 2, paddingHorizontal: 8, borderRadius: 3, fontSize: 9 },
  section: { marginBottom: 16 },
  sectionLabel: { fontSize: 8, textTransform: "uppercase", letterSpacing: 1, color: "#6f6a60", marginBottom: 4 },
  metaRow: { flexDirection: "row", flexWrap: "wrap", marginBottom: 16 },
  metaItem: { width: "33%", marginBottom: 8 },
  metaLabel: { fontSize: 8, textTransform: "uppercase", color: "#6f6a60", marginBottom: 2 },
  metaValue: { fontSize: 10 },
  table: { borderTopWidth: 1, borderColor: "#e3ddcf" },
  tableHeaderRow: { flexDirection: "row", backgroundColor: "#f2ede2", paddingVertical: 6, paddingHorizontal: 6 },
  tableRow: { flexDirection: "row", paddingVertical: 6, paddingHorizontal: 6, borderBottomWidth: 1, borderColor: "#e3ddcf" },
  colDescription: { flex: 3 },
  colQty: { flex: 1, textAlign: "right" },
  colPrice: { flex: 1, textAlign: "right" },
  colAmount: { flex: 1, textAlign: "right" },
  tableHeaderText: { fontSize: 8, textTransform: "uppercase", color: "#6f6a60" },
  totals: { alignSelf: "flex-end", width: 220, marginTop: 12 },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3 },
  totalRowStrong: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, borderTopWidth: 1, borderColor: "#12161f", marginTop: 4 },
  totalLabel: { color: "#6f6a60" },
  totalLabelStrong: { fontFamily: "Helvetica-Bold" },
  footer: { position: "absolute", bottom: 40, left: 40, right: 40, fontSize: 8, color: "#6f6a60" },
  footerHeading: { fontSize: 9, fontFamily: "Helvetica-Bold", color: "#12161f", marginBottom: 3 },
});

export type DocumentItem = { description: string; quantity: number; unitPrice: number; amount: number };
export type MetaField = { label: string; value: string };

export function BusinessDocument({
  company,
  documentTitle,
  documentNumber,
  statusLabel,
  customer,
  meta = [],
  items,
  totals,
  paymentTerms,
  termsAndConditions,
  currency,
}: {
  company: CompanySettings;
  documentTitle: string;
  documentNumber: string;
  statusLabel?: string;
  customer: { name: string; email?: string | null; phone?: string | null; company?: string | null; billingAddress?: string | null };
  meta?: MetaField[];
  items?: DocumentItem[];
  totals?: { subtotal?: number; discount?: number; taxAmount?: number; total: number; amountPaid?: number; balanceDue?: number };
  paymentTerms?: string | null;
  termsAndConditions?: string | null;
  currency: string;
}) {
  const fmt = (n: number | undefined) =>
    new Intl.NumberFormat("en-IE", { style: "currency", currency }).format(n ?? 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.headerRow}>
          <View>
            {/* eslint-disable-next-line jsx-a11y/alt-text -- @react-pdf/renderer's Image, not an HTML <img>; it has no alt prop */}
            {company.logo_url ? <Image src={company.logo_url} style={styles.logo} /> : null}
            <Text style={styles.companyName}>{company.company_name}</Text>
            {company.legal_name ? <Text style={styles.companyLine}>{company.legal_name}</Text> : null}
            {company.address ? <Text style={styles.companyLine}>{company.address}</Text> : null}
            {company.email ? <Text style={styles.companyLine}>{company.email}</Text> : null}
            {company.phone ? <Text style={styles.companyLine}>{company.phone}</Text> : null}
            {company.tax_number ? <Text style={styles.companyLine}>Tax/VAT: {company.tax_number}</Text> : null}
          </View>
          <View>
            <Text style={styles.docTitle}>{documentTitle}</Text>
            <Text style={styles.docNumber}>{documentNumber}</Text>
            {statusLabel ? <Text style={styles.statusBadge}>{statusLabel}</Text> : null}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Billed to</Text>
          <Text style={styles.metaValue}>{customer.name}</Text>
          {customer.company ? <Text style={styles.companyLine}>{customer.company}</Text> : null}
          {customer.billingAddress ? <Text style={styles.companyLine}>{customer.billingAddress}</Text> : null}
          {customer.email ? <Text style={styles.companyLine}>{customer.email}</Text> : null}
          {customer.phone ? <Text style={styles.companyLine}>{customer.phone}</Text> : null}
        </View>

        {meta.length ? (
          <View style={styles.metaRow}>
            {meta.map((m) => (
              <View key={m.label} style={styles.metaItem}>
                <Text style={styles.metaLabel}>{m.label}</Text>
                <Text style={styles.metaValue}>{m.value}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {items && items.length ? (
          <View style={styles.table}>
            <View style={styles.tableHeaderRow}>
              <Text style={[styles.colDescription, styles.tableHeaderText]}>Description</Text>
              <Text style={[styles.colQty, styles.tableHeaderText]}>Qty</Text>
              <Text style={[styles.colPrice, styles.tableHeaderText]}>Unit price</Text>
              <Text style={[styles.colAmount, styles.tableHeaderText]}>Amount</Text>
            </View>
            {items.map((item, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={styles.colDescription}>{item.description}</Text>
                <Text style={styles.colQty}>{item.quantity}</Text>
                <Text style={styles.colPrice}>{fmt(item.unitPrice)}</Text>
                <Text style={styles.colAmount}>{fmt(item.amount)}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {totals ? (
          <View style={styles.totals}>
            {totals.subtotal !== undefined ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Subtotal</Text>
                <Text>{fmt(totals.subtotal)}</Text>
              </View>
            ) : null}
            {totals.discount ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Discount</Text>
                <Text>-{fmt(totals.discount)}</Text>
              </View>
            ) : null}
            {totals.taxAmount !== undefined ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Tax</Text>
                <Text>{fmt(totals.taxAmount)}</Text>
              </View>
            ) : null}
            <View style={styles.totalRowStrong}>
              <Text style={styles.totalLabelStrong}>Total</Text>
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{fmt(totals.total)}</Text>
            </View>
            {totals.amountPaid !== undefined ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Paid</Text>
                <Text>{fmt(totals.amountPaid)}</Text>
              </View>
            ) : null}
            {totals.balanceDue !== undefined ? (
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Balance due</Text>
                <Text>{fmt(totals.balanceDue)}</Text>
              </View>
            ) : null}
          </View>
        ) : null}

        <View style={styles.footer}>
          {paymentTerms ? (
            <View style={{ marginBottom: 8 }}>
              <Text style={styles.footerHeading}>Payment terms</Text>
              <Text>{paymentTerms}</Text>
            </View>
          ) : null}
          {termsAndConditions ? (
            <View>
              <Text style={styles.footerHeading}>Terms &amp; conditions</Text>
              <Text>{termsAndConditions}</Text>
            </View>
          ) : null}
        </View>
      </Page>
    </Document>
  );
}
