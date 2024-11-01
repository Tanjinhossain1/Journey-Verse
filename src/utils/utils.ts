
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
