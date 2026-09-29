"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronUp } from "lucide-react";
import { useStore } from "./store/StoreProvider";
import { currencies } from "@/lib/site";

export function CurrencySwitcher() {
  const { currency, setCurrency } = useStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const active = currencies.find((c) => c.code === currency) ?? currencies[1];

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="currency-menu"
        aria-label={`Currency: ${active.label}. Change currency`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-semibold text-ink hover:bg-gray-200"
      >
        {active.label}
        <ChevronUp aria-hidden="true" className={`size-4 transition-transform ${open ? "" : "rotate-180"}`} />
      </button>
      <div
        id="currency-menu"
        hidden={!open}
        className="absolute right-0 bottom-full z-50 mb-2 w-44 overflow-hidden rounded-xl border border-line bg-white py-1.5 shadow-float"
      >
        {currencies.map((c) => {
          const selected = c.code === currency;
          return (
            <button
              key={c.code}
              type="button"
              aria-pressed={selected}
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
              className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[15px] text-ink hover:bg-brand-50"
            >
              {c.label}
              {selected && <Check aria-hidden="true" className="size-4 text-brand-600" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
