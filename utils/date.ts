// Utilidades para manejar fechas guardadas como texto ISO "YYYY-MM-DD".
// Se arma la fecha a mano para evitar el desfase de zona horaria
// que produce new Date("YYYY-MM-DD") (lo interpreta como UTC).

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function parseISODate(iso: string): Date | undefined {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!match) return undefined;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

// "2024-03-15" -> "15 mar 2024"
export function formatDate(iso: string): string {
  const date = parseISODate(iso);
  if (!date) return "";
  return date.toLocaleDateString("es-EC", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
