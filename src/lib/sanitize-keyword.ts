// NOTE: スペース・全角スペース・URLエンコードで問題になる文字を削除し、正規化する
export const sanitizeKeyword = (value: string): string =>
  value.replace(/[\s\u3000]+/g, '').replace(/[\\%+#&=?/]/g, '')
