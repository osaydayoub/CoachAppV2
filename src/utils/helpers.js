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

  export const isSameMonthAndYear = (date1, date2) =>
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

export const isToday=(date)=>{
  const inputDate = new Date(date);
  inputDate.setHours(0, 0, 0, 0);
  const Today= new Date();
  Today.setHours(0, 0, 0, 0);
  return Today.getTime() === inputDate.getTime()
}


export const getGreeting = () => {
  const currentHour = new Date().getHours();
  if (currentHour < 12) {
    return "Good morning";
  } else if (currentHour < 18) {
    return "Good afternoon";
  } else if (currentHour < 22) {
    return "Good evening";
  } else {
    return "Good night";
  }
};

export const getCurrentDateTime = () => {
  const now = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const date = now.toLocaleDateString(undefined, options); 
  const time = now.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${date} | ${time}`;
};

export const isRTL = (text) => {
  const rtlChar = /[\u0590-\u05FF\u0600-\u06FF]/; // Hebrew and Arabic Unicode ranges
  return rtlChar.test(text);
};