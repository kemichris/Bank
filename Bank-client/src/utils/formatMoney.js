// Lightweight money formatting utilities.
// Uses Intl.NumberFormat for consistent, locale-aware output and
// provides a small safe wrapper around non-numeric input.

export function createMoneyFormatter(locale = undefined, options = {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}) {
  return new Intl.NumberFormat(locale, options);
}

const defaultFormatter = createMoneyFormatter();

export function formatMoney(value, { formatter = defaultFormatter, showPlaceholder = true } = {}) {
  const num = Number(value);
  if (!Number.isFinite(num)) {
    return showPlaceholder ? formatter.format(0) : '—';
  }
  return formatter.format(num);
}

export default formatMoney;
