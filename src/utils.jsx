export const uid = () =>
  Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

export function formatDate(t) {
  const d = new Date(t);
  const now = new Date();
  if (d.toDateString() === now.toDateString()) {
    return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }
  return d.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: d.getFullYear() === now.getFullYear() ? undefined : "numeric",
  });
}

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function highlight(text, query) {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${escapeRegex(query)})`, "ig"));
  return parts.map((p, i) =>
    p.toLowerCase() === query.toLowerCase() ? <mark key={i}>{p}</mark> : p
  );
}

export function snippet(body, query) {
  const flat = body.replace(/\s+/g, " ").trim();
  if (!query) return flat.slice(0, 80);
  const i = flat.toLowerCase().indexOf(query.toLowerCase());
  if (i < 0) return flat.slice(0, 80);
  const start = Math.max(0, i - 20);
  return (start ? "…" : "") + flat.slice(start, start + 90);
}
