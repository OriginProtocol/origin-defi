export function estimateTimeToFutureTimestamp(futureTimestamp: number): string {
  const currentDate = new Date();
  const futureDate = new Date(futureTimestamp);

  const differenceInSeconds =
    (futureDate.getTime() - currentDate.getTime()) / 1000; // Difference in seconds

  if (differenceInSeconds <= 0) {
    return '0 months';
  }

  const days = differenceInSeconds / (60 * 60 * 24);
  if (days < 30) {
    return days === 1 ? '1 day' : `${Math.round(days)} days`;
  }

  const months = days / 30.44; // Average days in a month
  return months === 1 ? '1 month' : `${Math.round(months)} months`;
}

export function getDateAfterMonths(monthsToAdd: number): string {
  const today = new Date();
  today.setMonth(today.getMonth() + monthsToAdd);

  const day = String(today.getDate()).padStart(2, '0');
  const month = today.toLocaleString('default', { month: 'short' });
  const year = today.getFullYear();

  return `${day} ${month} ${year}`;
}

export function formatDurationInMonths(months: number): string {
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  let duration = '';

  if (years > 0) {
    duration += `${years} year${years !== 1 ? 's' : ''}`;
  }

  if (remainingMonths > 0) {
    if (duration) {
      duration += ', ';
    }
    duration += `${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
  }

  return duration || '0 months';
}

export function formatDateFromTimestamp(timestamp: number): string {
  const date = new Date(timestamp);

  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
}

export function getTimestampAfterMonths(monthsToAdd: number): number {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + monthsToAdd);
  return currentDate.getTime();
}

export function monthsToTimestamp(targetTimestamp: number): number {
  const currentDate = new Date();
  const targetDate = new Date(targetTimestamp);

  const yearsDifference = targetDate.getFullYear() - currentDate.getFullYear();
  const monthsDifference = targetDate.getMonth() - currentDate.getMonth();

  const months = yearsDifference * 12 + monthsDifference;

  return months > 0 ? months : 0;
}
