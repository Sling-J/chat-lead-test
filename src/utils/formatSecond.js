export function timeToSeconds(value, format) {
   return (format === 'day') ? value * 24 * 60 * 60 :
      (format === 'hours') ? value * 3600 :
         (format === 'min') ? value * 60 : value;
}

export function secondsToTime(value, format) {
   if (value >= 60) {
      return (format === 'day') ? Math.floor(value) / 24 / 60 / 60 :
         (format === 'hours') ? Math.floor(value) / 3600 :
            (format === 'min') ? Math.floor(value) / 60 : Math.floor(value);
   }

   return value
}
