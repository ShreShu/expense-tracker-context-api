export const formatEmail = (email) => {
  return email
    .split("")
    .filter((e) => e !== "@" && e !== ".")
    .join("");
};
