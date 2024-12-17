export const MoneyFormatter = ({ amount, currency}) => {
    const formattedAmount = new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 2,
    }).format(parseInt(amount));
  
    return <span>{formattedAmount}</span>;
  };