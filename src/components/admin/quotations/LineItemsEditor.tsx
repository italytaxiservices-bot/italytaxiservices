"use client";

import { useMemo } from "react";
import { Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/admin/format";

export type LineItem = { description: string; quantity: number; unit_price: number; service_id?: string };

export type ServiceOption = { id: string; name: string; default_price: number | null; currency: string | null };

export function LineItemsEditor({
  name,
  items,
  onItemsChange,
  discount,
  taxRate,
  currency,
  onDiscountChange,
  onTaxRateChange,
  services,
}: {
  name: string;
  items: LineItem[];
  onItemsChange: (items: LineItem[]) => void;
  discount: number;
  taxRate: number;
  currency: string;
  onDiscountChange: (value: number) => void;
  onTaxRateChange: (value: number) => void;
  services?: ServiceOption[];
}) {
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.quantity * i.unit_price, 0), [items]);
  const taxAmount = Math.max(0, subtotal - discount) * (taxRate / 100);
  const total = Math.max(0, subtotal - discount) + taxAmount;

  function update(index: number, patch: Partial<LineItem>) {
    onItemsChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  }

  return (
    <div>
      <input type="hidden" name={name} value={JSON.stringify(items)} />

      <div className="border border-admin-line rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-admin-stone bg-admin-ivory-deep">
              {services ? <th className="px-3 py-2 font-medium w-40">Service</th> : null}
              <th className="px-3 py-2 font-medium">Description</th>
              <th className="px-3 py-2 font-medium w-20">Qty</th>
              <th className="px-3 py-2 font-medium w-28">Unit price</th>
              <th className="px-3 py-2 font-medium w-28">Amount</th>
              <th className="px-3 py-2 w-10" />
            </tr>
          </thead>
          <tbody className="divide-y divide-admin-line">
            {items.map((item, index) => (
              <tr key={index}>
                {services ? (
                  <td className="px-3 py-1.5">
                    <select
                      value={item.service_id ?? ""}
                      onChange={(e) => {
                        const service = services.find((s) => s.id === e.target.value);
                        if (!service) {
                          update(index, { service_id: undefined });
                          return;
                        }
                        update(index, {
                          service_id: service.id,
                          description: item.description.trim() === "" ? service.name : item.description,
                          unit_price: service.default_price ?? item.unit_price,
                        });
                      }}
                      className="input-luxe text-sm"
                    >
                      <option value="">Custom line</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </td>
                ) : null}
                <td className="px-3 py-1.5">
                  <input
                    value={item.description}
                    onChange={(e) => update(index, { description: e.target.value })}
                    placeholder="e.g. Rome Fiumicino → City centre transfer"
                    className="input-luxe"
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    type="number"
                    min={0.01}
                    step="0.01"
                    value={item.quantity}
                    onChange={(e) => update(index, { quantity: Number(e.target.value) })}
                    className="input-luxe"
                  />
                </td>
                <td className="px-3 py-1.5">
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={item.unit_price}
                    onChange={(e) => update(index, { unit_price: Number(e.target.value) })}
                    className="input-luxe"
                  />
                </td>
                <td className="px-3 py-1.5 text-admin-ink">{formatCurrency(item.quantity * item.unit_price, currency)}</td>
                <td className="px-3 py-1.5 text-center">
                  <button
                    type="button"
                    onClick={() => onItemsChange(items.filter((_, i) => i !== index))}
                    disabled={items.length === 1}
                    className="text-admin-stone hover:text-red-600 disabled:opacity-30"
                    aria-label="Remove line"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => onItemsChange([...items, { description: "", quantity: 1, unit_price: 0 }])}
          className="flex items-center gap-1.5 text-xs text-admin-gold px-3 py-2 hover:underline"
        >
          <Plus className="h-3.5 w-3.5" /> Add line
        </button>
      </div>

      <div className="mt-4 ml-auto max-w-xs space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-admin-stone">Subtotal</span>
          <span>{formatCurrency(subtotal, currency)}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="discount" className="text-admin-stone">
            Discount
          </label>
          <input
            id="discount"
            type="number"
            min={0}
            step="0.01"
            value={discount}
            onChange={(e) => onDiscountChange(Number(e.target.value))}
            className="input-luxe w-24 text-right"
          />
        </div>
        <div className="flex items-center justify-between gap-3">
          <label htmlFor="tax_rate" className="text-admin-stone">
            Tax rate (%)
          </label>
          <input
            id="tax_rate"
            type="number"
            min={0}
            step="0.01"
            value={taxRate}
            onChange={(e) => onTaxRateChange(Number(e.target.value))}
            className="input-luxe w-24 text-right"
          />
        </div>
        <div className="flex items-center justify-between text-admin-stone">
          <span>Tax amount</span>
          <span>{formatCurrency(taxAmount, currency)}</span>
        </div>
        <div className="flex items-center justify-between font-semibold text-admin-ink text-base pt-2 border-t border-admin-line">
          <span>Total</span>
          <span>{formatCurrency(total, currency)}</span>
        </div>
      </div>
    </div>
  );
}
