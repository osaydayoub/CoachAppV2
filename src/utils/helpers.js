export const getFullDate = (date) => {
  let year = date.getFullYear();
  // Months are zero-based, so add 1
  let month = date.getMonth() + 1;
  let m = month >= 10 ? month : `0${month}`;
  let day = date.getDate();
  return `${year}-${m}-${day}`;
};

export const getTime = (date) => {
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if(minutes>9)
  return `${hour}:${minutes}`;
  else
  return `${hour}:0${minutes}`;
};

export const isSameDay = (date1, date2) =>
  date1.getDate() === date2.getDate() &&
  date1.getMonth() === date2.getMonth() &&
  date1.getFullYear() === date2.getFullYear();

// export const getDayAndMonth = (date) => {
//     let year = date.getFullYear();
//     // Months are zero-based, so add 1
//     let month = date.getMonth() + 1;
//     let m = month >= 10 ? month : `0${month}`;
//     let day = date.getDate();
//     return `${m}-${day}`;
//   };

export function dateIsWithinSevenDays(date) {
  // Get the current date
  let currentDate = new Date();
  // console.log(currentDate);

  // Calculate the date 7 days from now
  let sevenDaysLater = new Date(currentDate);
  sevenDaysLater.setDate(currentDate.getDate() + 7);

  // Clone the original date to avoid modifying it directly
  let newDate = new Date(date);
  // console.log(newDate);
  // console.log(newDate >= currentDate);
  // console.log(newDate <= sevenDaysLater);
  // console.log((newDate >= currentDate) && (newDate <= sevenDaysLater));


  // Return true if the new date is within the next 7 days
  return (newDate >= currentDate) && (newDate <= sevenDaysLater);
}


