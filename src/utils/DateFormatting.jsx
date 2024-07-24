/**
 * Format a given date string into '16 Jun 2023' format.
 * @param {string} dateString - The date string in ISO format.
 * @return {string} The formatted date string.
 */
export function formatDate(dateString) {
  const date = new Date(dateString);

  const options = {
    day: "2-digit",
    month: "short",
    year: "numeric",
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date);
}

/**
 * Format a given date string into '11:00 am' format.
 * @param {string} dateString - The date string in ISO format.
 * @return {string} The formatted time string.
 */
export function formatTime(dateString) {
  const date = new Date(dateString);

  const options = {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return new Intl.DateTimeFormat("en-GB", options).format(date).toLowerCase();
}
