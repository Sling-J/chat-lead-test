import moment from "moment";

/** Date formatting to timestamp **/

export const formatDateToUnix = date => {
   if (typeof date === 'object') {
      return moment(date).unix();
   }

   return date;
};

export const formatUnixToDate = (date, type, isCalendar) => {
   if (typeof date === 'number') {
      // type of format to display
      const formatType =
         type
            ? 'YYYY.MM.DD H:mm'
            : 'YYYY.MM.DD';

      return isCalendar ?
         new Date(date * 1000) :
         moment(date * 1000).format(formatType)
   }

   return date;
};
