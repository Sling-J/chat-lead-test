export function timeToSeconds(value, format) {
   return (format === 'day') ? value * 24 * 60 * 60 :
      (format === 'hours') ? value * 3600 :
         (format === 'min') ? value * 60 : value;
}

export function secondsToTime(value, format) {
   return (format === 'day') ? value / 24 / 60 / 60 :
      (format === 'hours') ? value / 3600 :
         (format === 'min') ? value / 60 : value;
}
