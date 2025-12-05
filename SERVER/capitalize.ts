export const toLocaleCapitalize = (str: string, locale: string = "en-US") => {
  if (!str) return str;
  return str[0].toLocaleUpperCase(locale) + str.slice(1);
};
