export function timeToSeconds(value, format) {
   const result = (format === 'day') ? value * 24 * 60 * 60 :
      (format === 'hours') ? value * 3600 :
         (format === 'min') ? value * 60 : value;

   return result;
}

export function secondsToTime(value, format) {
   if (value >= 60) {
      return (format === 'day') ? value / 24 / 60 / 60 :
         (format === 'hours') ? value / 3600 :
            (format === 'min') ? value / 60 : value;
   }

   return value
}
