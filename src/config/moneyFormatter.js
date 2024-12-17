export const moneyFormatter = (amount, currency) => {
    if (!amount || isNaN(amount)) return `0.00 ${currency}`;
    return new Intl.NumberFormat("uz-UZ", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    }).format(parseInt(amount))
};
