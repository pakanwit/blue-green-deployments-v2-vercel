export const splitTextByDoubleSlash = (text: string) =>
  text.split('//').map((name) => name.trim());
