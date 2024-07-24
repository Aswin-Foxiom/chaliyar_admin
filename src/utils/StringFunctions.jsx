export function capitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const ShortenedName = (name) => {
  if (!name) {
    return "";
  }
  const shortenedName = name.length > 20 ? `${name.substring(0, 20)}...` : name;

  return shortenedName;
};
