export const formatNumeral = (num) => {
  return num.toLocaleString("es-ES", {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
    style: "decimal",
  })
}