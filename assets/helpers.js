const months = {
  0: 'Jan',
  1: 'Feb',
  2: 'Mar',
  3: 'Apr',
  4: 'May',
  5: 'Jun',
  6: 'Jul',
  7: 'Aug',
  8: 'Sep',
  9: 'Oct',
  10: 'Nov',
  11: 'Dec',
};

export function formatDate(date) {
  const d = new Date(date);
  const monthIndex = d.getMonth();
  const monthName = months[monthIndex];
  const day = d.getDate();
  const year = d.getFullYear();

  return `${monthName} ${day}, ${year}`;
}

export function formatNumber(num) {
  if (num < 1000) {
    return num;
  }
  return `${(num / 1000).toFixed(1)}k`;
}
