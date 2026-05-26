const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function randomChars(length: number): string {
  let result = "";
  const array = new Uint32Array(length);
  crypto.getRandomValues(array);
  for (let i = 0; i < length; i++) {
    result += CHARSET[array[i] % CHARSET.length];
  }
  return result;
}

export function generateApplicationId(): string {
  return `VH-2026-${randomChars(4)}`;
}

export function generateCheckInCode(): string {
  return randomChars(8);
}
