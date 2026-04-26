export const sanitizeKeyword = (value: string): string =>
  value.replace(/[\s\u3000]+/g, '')
