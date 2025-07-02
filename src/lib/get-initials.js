// utils/getInitials.js (or define inline if short project)
export function getInitials(name) {
  if (!name) return "";
  return name
    .split(" ")
    .map(part => part[0])
    .join("")
    .toUpperCase();
}
