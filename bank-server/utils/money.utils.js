/**
 * Converts a user-entered amount (e.g. 1500.75)
 * to the smallest currency unit (150075 kobo).
 */
export const toSmallestUnit = (amount) => {
    return Math.round(Number(amount) * 100);
};

/**
 * Converts the smallest currency unit
 * back to a normal amount.
 */
export const fromSmallestUnit = (amount) => {
    return amount / 100;
};

/**
 * Formats an amount for display.
 */
export const formatMoney = (amount, currency = "NGN") => {
    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
    }).format(fromSmallestUnit(amount));
};