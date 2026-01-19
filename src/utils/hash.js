export const hashString = async (text) => {
  const msgUint8 = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgUint8);
  return btoa(String.fromCharCode(...new Uint8Array(hashBuffer)));
};
