export const formatNumeral = (num) => {
  const formatter = new Intl.NumberFormat("es-ES", {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: "decimal",
  });
  return formatter.format(num);
};
