export function isalpha(src: string) {
  return src.toUpperCase() != src.toLowerCase() || src == "_";
}

export function isskippable(str: string) {
  return str == " " || str == "\n" || str == "\t" || str == "\r";
}

export function isint(str: string) {
  const c = str.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
}
