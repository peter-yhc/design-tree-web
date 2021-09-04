/* eslint-disable import/prefer-default-export */
export function b64EncodeUnicode(str: string) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(Number(`0x${p1}`))));
}
