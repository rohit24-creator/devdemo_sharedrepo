import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { v4 as uuidv4 } from "uuid";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatRowsWithId(rows) {
  return rows.map((row, idx) => ({
    ...row,
    id: row.id || uuidv4() || `row-${idx}`,
  }));
}
