const currentYear = new Date().getFullYear();
export const yearOptions = Array.from(Array(5).keys()).map((_) => ({
  value: String(_ + currentYear),
  label: String(_ + currentYear),
}));
// console.log(yearOptions, currentYear);
