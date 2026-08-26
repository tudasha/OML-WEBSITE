import { useEffect, useState } from "react";
import type { EventInfo } from "@/data/events";

// Countdown live către evenimentul primit ca prop, calculat din event.isoDate. Dacă data a
// trecut deja (sau nu se poate calcula), arată fallback-ul "Urmează în curând" în loc de un
// countdown negativ — vezi Faza 3 din HOMEPAGE_REDESIGN_PLAN.md.
// Notă: ora exactă a evenimentului nu e confirmată încă (doar data), deci se calculează până
// la miezul nopții zilei respective (00:00 local) — de rafinat cu ora reală când e disponibilă.
interface EventCountdownProps {
  event: EventInfo;
  className?: string;
}

interface TimeParts {
  days: number;
  hours: number;
  minutes: number;
}

function getTimeParts(isoDate?: string): TimeParts | null {
  // Fără isoDate (ediții din istoric fără dată cunoscută) — nu putem calcula nimic, arătăm
  // direct fallback-ul, nu încercăm un new Date(undefined) care ar da "Invalid Date".
  if (!isoDate) return null;
  const diff = new Date(`${isoDate}T00:00:00`).getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

const EventCountdown = ({ event, className }: EventCountdownProps) => {
  const [parts, setParts] = useState<TimeParts | null>(() => getTimeParts(event.isoDate));

  useEffect(() => {
    setParts(getTimeParts(event.isoDate));
    // Actualizare la fiecare minut e suficient pentru un countdown pe zile/ore/minute —
    // nu are rost un interval mai des, doar consumă resurse degeaba.
    const id = setInterval(() => setParts(getTimeParts(event.isoDate)), 60_000);
    return () => clearInterval(id);
  }, [event.isoDate]);

  if (!parts) {
    return <p className={className}>Urmează în curând</p>;
  }

  const units: Array<[number, string]> = [
    [parts.days, parts.days === 1 ? "zi" : "zile"],
    [parts.hours, "ore"],
    [parts.minutes, "min"],
  ];

  return (
    <div className={className} aria-label={`${parts.days} zile, ${parts.hours} ore și ${parts.minutes} minute până la eveniment`}>
      <div className="flex items-center gap-3">
        {units.map(([value, label]) => (
          <div key={label} className="text-center">
            <span className="block text-xl font-display font-bold text-primary">{value}</span>
            <span className="block text-[11px] text-white/60 uppercase tracking-wide">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCountdown;
