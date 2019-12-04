import moment from "moment";

/** Date formatting to timestamp **/

export const dateFormat = 'YYYY.MM.DD';
export const dateTimerFormat = 'YYYY.MM.DD H:mm';
export const flatDateTimerFormat = 'Y-m-d H:i';

export const formatDateToUnix = date => {
   if (typeof date === 'object') {
      return moment(date).unix();
   }

   return date;
};

export const formatUnixToDate = (date, type, isCalendar) => {
   if (typeof date === 'number') {

      const formatType = type
         ? dateTimerFormat
         : dateFormat;

      return isCalendar ?
         new Date(date * 1000) :
         moment(date * 1000).format(formatType)
   }

   return date;
};
