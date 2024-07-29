export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthOptions = monthNames.map((item) => ({
  value: item,
  label: item,
}));

export const genderNames = ["Male", "Female", "Other"];

export const genderOptions = genderNames.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodNames = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const bloodOptions = bloodNames.map((item) => ({
  value: item,
  label: item,
}));
