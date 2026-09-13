"use client";

import { useEffect, useRef, useState } from "react";

type Option = { id: string; label: string };

export function EntityPicker({
  entity,
  name,
  defaultValue,
  defaultLabel,
  placeholder = "Search…",
  required,
}: {
  entity: "customers" | "drivers" | "vehicles" | "bookings" | "profiles";
  name: string;
  defaultValue?: string;
  defaultLabel?: string;
  placeholder?: string;
  required?: boolean;
}) {
  const [query, setQuery] = useState(defaultLabel ?? "");
  const [options, setOptions] = useState<Option[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(defaultValue ?? "");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/admin/api/lookup?entity=${entity}&q=${encodeURIComponent(query)}`);
        const json = await res.json();
        setOptions(json.results ?? []);
      } catch {
        setOptions([]);
      }
    }, 200);
    return () => clearTimeout(timeout);
  }, [query, open, entity]);

  return (
    <div ref={containerRef} className="relative">
      <input type="hidden" name={name} value={selectedId} required={required} />
      <input
        type="text"
        value={query}
        placeholder={placeholder}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelectedId("");
          setOpen(true);
        }}
        className="input-luxe"
      />
      {open && options.length > 0 ? (
        <ul className="absolute z-20 mt-1 w-full max-h-56 overflow-y-auto bg-white border border-admin-line rounded-sm shadow-lg">
          {options.map((opt) => (
            <li key={opt.id}>
              <button
                type="button"
                className="w-full text-left px-3 py-2 text-sm hover:bg-admin-ivory-deep"
                onClick={() => {
                  setSelectedId(opt.id);
                  setQuery(opt.label);
                  setOpen(false);
                }}
              >
                {opt.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
