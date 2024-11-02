
export const formatForUrlWith_under_score = (text: string) => {
    if(text){
      const formattedTitle = text
      .split(" ")
      .map((word) => word.charAt(0) + word.slice(1))
      .join("_");
      return formattedTitle;
    }else{
      return '';
    }
  }

  // utils/formatDate.js

export function formatDateToDDMMYYYY(dateString:string) {
  const date = new Date(dateString);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getUTCFullYear();
  
  return `${day}/${month}/${year}`;
}
export function calculateDaysBetween(checkIn:string, checkout:string) {
  // Parse dates to ensure they're in the correct format
  const checkInDate = new Date(checkIn);
  const checkoutDate = new Date(checkout);

  // Set the time to 12 PM for both dates
  checkInDate.setHours(12, 0, 0, 0);
  checkoutDate.setHours(12, 0, 0, 0);

  // Calculate the difference in milliseconds and convert to days
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const dayDifference = Math.round((checkoutDate.getTime() - checkInDate.getTime()) / millisecondsPerDay);

  return dayDifference;
}

export function formatDate(isoDate: Date): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

export function formatDateDates(isoDate: Date): string {
  const date = new Date(isoDate);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function toISODateString(date: any): string | null {
  // Check if date is a valid ISO string by trying to parse it
  if (typeof date === "string" && !isNaN(Date.parse(date))) {
      return date; // Already in ISO format
  }

  // If date is a Date object, convert it to ISO
  if (date instanceof Date) {
      return date.toISOString();
  }

  return null; // Return null if it's neither an ISO string nor a Date object
}
