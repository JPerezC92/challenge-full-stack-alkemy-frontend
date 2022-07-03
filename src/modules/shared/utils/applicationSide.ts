export function isClient() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

export function isServer() {
  return !isClient();
}
